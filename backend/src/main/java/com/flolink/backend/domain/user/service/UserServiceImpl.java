package com.flolink.backend.domain.user.service;

import static com.flolink.backend.domain.user.entity.enumtype.RoleType.*;

import java.time.LocalDateTime;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.flolink.backend.domain.myroom.entity.MyRoom;
import com.flolink.backend.domain.user.dto.request.ChangePasswordRequest;
import com.flolink.backend.domain.user.dto.request.EmotionRequest;
import com.flolink.backend.domain.user.dto.request.FindUserIdRequest;
import com.flolink.backend.domain.user.dto.request.ForgotPasswordAuthRequest;
import com.flolink.backend.domain.user.dto.request.ForgotPasswordChangeRequest;
import com.flolink.backend.domain.user.dto.request.JoinUserRequest;
import com.flolink.backend.domain.user.dto.request.ProfileRequest;
import com.flolink.backend.domain.user.dto.request.StatusMessageRequest;
import com.flolink.backend.domain.user.dto.response.FindUserIdResponse;
import com.flolink.backend.domain.user.dto.response.UserInfoResponse;
import com.flolink.backend.domain.user.entity.User;
import com.flolink.backend.domain.user.repository.UserRepository;
import com.flolink.backend.domain.user.util.LoginIdEditor;
import com.flolink.backend.global.auth.entity.SuccessToken;
import com.flolink.backend.global.auth.repository.SuccessTokenRepository;
import com.flolink.backend.global.common.ResponseCode;
import com.flolink.backend.global.common.exception.DuplicateException;
import com.flolink.backend.global.common.exception.NotFoundException;
import com.flolink.backend.global.common.exception.TimeOutException;
import com.flolink.backend.global.common.exception.UnAuthorizedException;
import com.flolink.backend.global.util.JwtUtil;

import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

	private JwtUtil jwtUtil;
	private final LoginIdEditor loginIdEditor;
	private final UserRepository userRepository;
	private final SuccessTokenRepository successTokenRepository;
	private final BCryptPasswordEncoder bCryptPasswordEncoder;
	private final EntityManager em;

	/**
	 * 계정생성
	 * @param joinUserRequest (loginId, password, username, nickname, tel, token(SuccessToken))
	 */
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

		MyRoom myRoom = MyRoom.createMyRoom();

		em.persist(myRoom);
		em.flush();

		User user = User.toEntity(loginId, bCryptPasswordEncoder.encode(password),
			myRoom, joinUserRequest, LOCAL);

		userRepository.save(user);
	}

	/**
	 * DB내 동일한 아이디 있는지 확인
	 * @param loginId
	 * @return
	 */
	// 아이디 중복 확인
	@Override
	public boolean isExistLoginId(String loginId) {
		boolean isExistId = userRepository.existsByLoginId(loginId);
		if (!isExistId) {
			// throw new DuplicateException(ResponseCode.DUPLICATE_LOGIN_ID);
			return false;
		}
		return true;
	}

	/**
	 * 아이디 분실 시 해당 전화번호로 등록된 아이디를 반환
	 * @param findUserIdRequest (userName,tel,token(SuccessToken))
	 * @return loginId (ex. adm*******ter)
	 */
	// 아이디 찾기
	@Override
	@Transactional
	public FindUserIdResponse findMyId(FindUserIdRequest findUserIdRequest) {
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

	/**
	 * 	비밀번호 변경 전 휴대전화 인증 토큰을 발급받기 위한 절차
	 *  @param forgotPasswordAuthRequest (loginId, username, tel, token(SuccessToken))
	 */
	@Override
	@Transactional
	public void forgotPasswordAuth(ForgotPasswordAuthRequest forgotPasswordAuthRequest) {
		// 입력 들어온 전화번호를 가지고 인증 객체 찾는다.
		SuccessToken token = successTokenRepository.findByToken(forgotPasswordAuthRequest.getToken())
			.orElseThrow(() -> new NotFoundException(ResponseCode.NOT_FOUND_ERROR));
		// 입력 들어온 전화번호를 가지고 유저 객체를 찾는다.
		User user = userRepository.findByTel(forgotPasswordAuthRequest.getTel())
			.orElseThrow(() -> new NotFoundException(ResponseCode.NOT_FOUND_ERROR));

		// 해당 객체의 유효기간이 지났다면 timeoutException, 객체의 인증번호가 입력값과 다르다면 notfoundException
		// 유저 객체의 이름과, 입력들어온 이름이 다르다면 NotFoundException
		try {
			LocalDateTime now = LocalDateTime.now();
			if (now.isAfter(token.getExpiredAt())) {
				throw new TimeOutException(ResponseCode.TIME_OUT_EXCEPTION);
			} else if (!token.getToken().equals(forgotPasswordAuthRequest.getToken())) {
				throw new NotFoundException(ResponseCode.NOT_FOUND_ERROR);
			} else if (!user.getLoginId().equals(forgotPasswordAuthRequest.getLoginId())) {
				throw new NotFoundException(ResponseCode.NOT_FOUND_ERROR);
			} else if (!user.getUserName().equals(forgotPasswordAuthRequest.getUserName())) {
				throw new NotFoundException(ResponseCode.NOT_FOUND_ERROR);
			}
		} catch (TimeOutException | NotFoundException e) {
			successTokenRepository.deleteByToken(forgotPasswordAuthRequest.getToken());
		}
	}

	/**
	 * 비밀번호 분실 시 비밀번호를 재발급한다.
	 * @param forgotPasswordChangeRequest (아이디, 패스워드, 패스워드확인, 전화번호 인증 성공토큰(SuccessToken))
	 */
	//비밀번호 변경
	@Override
	@Transactional
	public void forgotPasswordChange(ForgotPasswordChangeRequest forgotPasswordChangeRequest) {
		User user = userRepository.findByLoginId(forgotPasswordChangeRequest.getLoginId())
			.orElseThrow(() -> new NotFoundException(ResponseCode.NOT_FOUND_ERROR));
		SuccessToken successToken = successTokenRepository.findByToken(forgotPasswordChangeRequest.getToken())
			.orElseThrow(() -> new NotFoundException(ResponseCode.NOT_FOUND_ERROR));

		try {
			if (!forgotPasswordChangeRequest.getNewPassword()
				.equals(forgotPasswordChangeRequest.getNewPasswordConfirm())) {
				throw new UnAuthorizedException(ResponseCode.PASSWORD_INCONSISTENCY);
			} else if (!user.getTel().equals(successToken.getTel())) {
				throw new NotFoundException(ResponseCode.NOT_FOUND_ERROR);
			}
		} finally {
			successTokenRepository.deleteById(successToken.getSuccessTokenId());
		}
		user.setPassword(bCryptPasswordEncoder.encode(forgotPasswordChangeRequest.getNewPassword()));
	}

	@Override
	@Transactional
	public void passwordChange(ChangePasswordRequest changePasswordRequest, Integer userId) {
		User user = userRepository.findById(userId)
			.orElseThrow(() -> new NotFoundException(ResponseCode.NOT_FOUND_ERROR));

		if (!user.getLoginId().equals(changePasswordRequest.getLoginId())) {
			throw new NotFoundException(ResponseCode.USER_INCONSISTENCY);
		} else if (!changePasswordRequest.getNewPassword().equals(changePasswordRequest.getNewPasswordConfirm())) {
			throw new UnAuthorizedException(ResponseCode.PASSWORD_INCONSISTENCY);
		} else if (!user.getRole().equals(LOCAL)) {
			throw new UnAuthorizedException(ResponseCode.UNAUTHORIZED_USER);
		}

		user.setPassword(bCryptPasswordEncoder.encode(changePasswordRequest.getNewPassword()));
	}

	/**
	 * userId가 일치하는 유저의 특정 정보를 반환한다.
	 * @param userId
	 * @return (닉네임, 보유포인트, 프로필사진) 반환
	 */
	@Override
	public UserInfoResponse getUserInfo(Integer userId) {
		User user = userRepository.findById(userId)
			.orElseThrow(() -> new NotFoundException(ResponseCode.NOT_FOUND_ERROR));

		return UserInfoResponse.builder()
			.nickname(user.getNickname())
			.point(user.getPoint())
			.profile(user.getProfile())
			.build();
	}

	/**
	 * 유저 정보 삭제(SoftDelete), 상태변경을 진행한다.
	 * @param userId
	 */
	@Override
	@Transactional
	public void deleteUserInfo(Integer userId) {
		User user = userRepository.findById(userId)
			.orElseThrow(() -> new NotFoundException(ResponseCode.NOT_FOUND_ERROR));

		user.setUseYn(false);
	}

	/**
	 * 유저 닉네임 변경 (공백 불가)
	 * @param nickname
	 * @param userId
	 */
	@Override
	@Transactional
	public void modifyNickname(String nickname, Integer userId) {
		if (nickname.isBlank()) {
			throw new NotFoundException(ResponseCode.BLANK_NICKNAME);
		}

		User user = userRepository.findById(userId)
			.orElseThrow(() -> new NotFoundException(ResponseCode.NOT_FOUND_ERROR));

		user.setNickname(nickname);
	}

	/**
	 *
	 * @param statusMessageRequest 변경할 메세지
	 * @param userId 로그인한 유저 아이디
	 */
	@Override
	@Transactional
	public void modifyMessage(StatusMessageRequest statusMessageRequest, Integer userId) {
		User user = userRepository.findById(userId)
			.orElseThrow(() -> new NotFoundException(ResponseCode.NOT_FOUND_ERROR));
		user.setStatusMessage(statusMessageRequest.getStatusMessage());
	}

	/**
	 *
	 * @param profileRequest 변경할 프로필사진
	 * @param userId 로그인한 유저 아이디
	 */
	@Override
	@Transactional
	public void modifyProfile(ProfileRequest profileRequest, Integer userId) {
		User user = userRepository.findById(userId)
			.orElseThrow(() -> new NotFoundException(ResponseCode.NOT_FOUND_ERROR));
		user.setProfile(profileRequest.getProfile());
	}

	/**
	 *
	 * @param emotionRequest 변경할 기분 상태
	 * @param userId 로그인한 유저 아이디
	 */
	@Override
	@Transactional
	public void modifyEmotion(EmotionRequest emotionRequest, Integer userId) {
		User user = userRepository.findById(userId)
			.orElseThrow(() -> new NotFoundException(ResponseCode.NOT_FOUND_ERROR));
		user.setEmotion(emotionRequest.getEmotion());
	}

}
