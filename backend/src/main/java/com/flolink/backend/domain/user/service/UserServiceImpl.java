package com.flolink.backend.domain.user.service;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.flolink.backend.domain.auth.entity.SuccessToken;
import com.flolink.backend.domain.auth.repository.SuccessTokenRepository;
import com.flolink.backend.domain.myroom.entity.MyRoom;
import com.flolink.backend.domain.user.dto.request.JoinUserRequest;
import com.flolink.backend.domain.user.entity.User;
import com.flolink.backend.domain.user.repository.UserRepository;
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

	private final UserRepository userRepository;
	private final SuccessTokenRepository successTokenRepository;
	private final BCryptPasswordEncoder bCryptPasswordEncoder;
	private final EntityManager em;

	// 계정 생성
	@Transactional
	public void joinProcess(JoinUserRequest joinUserRequest) {
		String username = joinUserRequest.getUserName();
		String password = joinUserRequest.getPassword();

		//ID 중복확인
		boolean isExist = userRepository.existsByUserName(username);
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
			.userName(username)
			.myRoomId(myRoom.getMyRoomId())
			.password(bCryptPasswordEncoder.encode(password))
			.nickname(joinUserRequest.getNickName())
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
	public boolean isExistUserName(String username) {
		boolean isExistId = userRepository.existsByUserName(username);
		if (!isExistId) {
			throw new DuplicateException(ResponseCode.DUPLICATE_LOGIN_ID);
		}
		return true;
	}

}
