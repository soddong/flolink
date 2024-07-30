package com.flolink.backend.domain.user.service;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.flolink.backend.domain.auth.entity.Auth;
import com.flolink.backend.domain.auth.entity.SuccessToken;
import com.flolink.backend.domain.auth.repository.AuthRepository;
import com.flolink.backend.domain.auth.repository.SuccessTokenRepository;
import com.flolink.backend.domain.myroom.entity.MyRoom;
import com.flolink.backend.domain.user.dto.request.FindUserIdRequest;
import com.flolink.backend.domain.user.dto.request.JoinUserRequest;
import com.flolink.backend.domain.user.dto.request.UpdateUserPasswordRequest;
import com.flolink.backend.domain.user.entity.User;
import com.flolink.backend.domain.user.repository.UserRepository;
import com.flolink.backend.domain.user.util.LoginIdEditor;
import com.flolink.backend.global.common.ResponseCode;
import com.flolink.backend.global.common.exception.DuplicateException;
import com.flolink.backend.global.common.exception.NotFoundException;
import com.flolink.backend.global.common.exception.TimeOutException;
import com.flolink.backend.global.common.exception.UnAuthorizedException;

import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

	private final LoginIdEditor loginIdEditor;
	private final UserRepository userRepository;
	private final AuthRepository authRepository;
	private final SuccessTokenRepository successTokenRepository;
	private final BCryptPasswordEncoder bCryptPasswordEncoder;
	private final EntityManager em;

	// 계정 생성
	@Transactional
	public void joinProcess(JoinUserRequest joinUserRequest) {
		String loginId = joinUserRequest.getLoginId();
		String password = joinUserRequest.getPassword();

		//ID 중복확인
		boolean isExist = userRepository.existsByLoginId(loginId);
		if (isExist) {
			throw new DuplicateException(ResponseCode.DUPLICATE_LOGIN_ID);
		}

		SuccessToken successToken = successTokenRepository.findByToken(joinUserRequest.getToken())
			.orElseThrow(() -> new NotFoundException(ResponseCode.NOT_FOUND_ERROR));

		//휴대폰인증 토큰 확인
		try { // 토큰 불일치는 (not_authorized), 토큰 유효기간 초과는 (time_out_exception)
			boolean isPermittedToken = successToken.getToken().equals(joinUserRequest.getToken());
			if (!isPermittedToken) {
				throw new UnAuthorizedException(ResponseCode.NOT_AUTHORIZED);
			} else if (LocalDateTime.now().isAfter(successToken.getExpiredAt())) {
				throw new TimeOutException(ResponseCode.TIME_OUT_EXCEPTION);
			}
		} finally {
			// 어쨌든 사용한건 지워야한다.
			successTokenRepository.delete(successToken);
		}

		MyRoom myRoom = MyRoom.builder()
			.itemTable(0)
			.itemChair(0)
			.itemPot(0)
			.itemPhotoFrame(0)
			.build();

		em.persist(myRoom);
		em.flush();

		User user = User.builder()
			.loginId(loginId)
			.myRoomId(myRoom.getMyRoomId())
			.password(bCryptPasswordEncoder.encode(password))
			.userName(joinUserRequest.getUserName())
			.nickname(joinUserRequest.getNickname())
			.tel(joinUserRequest.getTel())
			.point(BigDecimal.ZERO)
			.createdAt(LocalDateTime.now())
			.useYn(true)
			.profile("profile_dummy")
			.build();

		userRepository.save(user);
	}

	// 아이디 중복 확인
	@Override
	public boolean isExistLoginId(String loginId) {
		boolean isExistId = userRepository.existsByLoginId(loginId);
		if (!isExistId) {
			throw new DuplicateException(ResponseCode.DUPLICATE_LOGIN_ID);
		}
		return true;
	}

	/**
	 *
	 * @param findUserIdRequest(userName,tel,authNum)
	 * @return loginId
	 */
	// 아이디 찾기
	@Override
	@Transactional
	public String findMyId(FindUserIdRequest findUserIdRequest) {
		// 입력 들어온 토큰을 가지고 인증 객체 찾는다.
		SuccessToken token = successTokenRepository.findByToken(findUserIdRequest.getToken())
			.orElseThrow(() -> new NotFoundException(ResponseCode.NOT_FOUND_ERROR));

		// 해당 객체의 유효기간이 지났다면 timeoutException, 객체의 전화번호 입력값과 다르다면 notfoundException
		try {
			LocalDateTime now = LocalDateTime.now();
			if (now.isAfter(token.getExpiredAt())) {
				throw new TimeOutException(ResponseCode.TIME_OUT_EXCEPTION);
			} else if (!token.getTel().equals(findUserIdRequest.getTel())) {
				throw new NotFoundException(ResponseCode.NOT_FOUND_ERROR);
			}
		} finally {
			successTokenRepository.deleteById(token.getSuccessTokenId());
		}

		// 입력 들어온 전화번호를 가지고 유저 객체를 찾는다.
		User user = userRepository.findByTel(findUserIdRequest.getTel())
			.orElseThrow(() -> new NotFoundException(ResponseCode.NOT_FOUND_ERROR));

		// 유저 객체의 이름과, 입력들어온 이름이 다르다면 NotFoundException
		if (!findUserIdRequest.getUserName().equals(user.getUserName())) {
			throw new NotFoundException(ResponseCode.NOT_FOUND_ERROR);
		}

		// 아이디 암호화 반환
		return loginIdEditor.maskId(user.getLoginId());
	}

	@Override
	@Transactional
	public void updateMyPassword(UpdateUserPasswordRequest findUserIdRequest) {
		// 입력 들어온 전화번호를 가지고 인증 객체 찾는다.
		Auth auth = authRepository.findByTel(findUserIdRequest.getTel())
			.orElseThrow(() -> new NotFoundException(ResponseCode.NOT_FOUND_ERROR));

		// 해당 객체의 유효기간이 지났다면 timeoutException, 객체의 인증번호가 입력값과 다르다면 notfoundException
		try {
			LocalDateTime now = LocalDateTime.now();
			if (now.isAfter(auth.getExpiredAt())) {
				throw new TimeOutException(ResponseCode.TIME_OUT_EXCEPTION);
			} else if (!auth.getAuthNum().equals(findUserIdRequest.getAuthNum())) {
				throw new NotFoundException(ResponseCode.NOT_FOUND_ERROR);
			}
		} finally {
			authRepository.deleteByTel(findUserIdRequest.getTel());
		}

		// 입력 들어온 전화번호를 가지고 유저 객체를 찾는다.
		User user = userRepository.findByTel(findUserIdRequest.getTel())
			.orElseThrow(() -> new NotFoundException(ResponseCode.NOT_FOUND_ERROR));

		// 유저 객체의 이름과, 입력들어온 이름이 다르다면 NotFoundException
		if (!findUserIdRequest.getUserName().equals(user.getUserName())) {
			throw new NotFoundException(ResponseCode.NOT_FOUND_ERROR);
		}

	}

}
