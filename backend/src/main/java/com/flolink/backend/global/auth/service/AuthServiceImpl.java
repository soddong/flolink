package com.flolink.backend.global.auth.service;

import java.time.LocalDateTime;
import java.util.UUID;

import com.flolink.backend.domain.user.entity.User;
import com.flolink.backend.domain.user.repository.UserRepository;
import com.flolink.backend.global.auth.dto.request.ResetPassword;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.exception.NurigoMessageNotReceivedException;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.service.DefaultMessageService;

import com.flolink.backend.global.auth.dto.request.CheckAuthRequest;
import com.flolink.backend.global.auth.dto.response.SuccessTokenResponse;
import com.flolink.backend.global.auth.entity.Auth;
import com.flolink.backend.global.auth.entity.SuccessToken;
import com.flolink.backend.global.auth.repository.AuthRepository;
import com.flolink.backend.global.auth.repository.SuccessTokenRepository;
import com.flolink.backend.global.common.ResponseCode;
import com.flolink.backend.global.common.exception.NotFoundException;
import com.flolink.backend.global.common.exception.TimeOutException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

	private final AuthRepository authRepository;
	private final SuccessTokenRepository successTokenRepository;
	private final UserRepository userRepository;
	private final BCryptPasswordEncoder bCryptPasswordEncoder;


	@Value("${nurigo.api.key}")
	private String apiKey;

	@Value("${nurigo.api.secretKey}")
	private String apiSecret;

	@Value("${nurigo.api.url}")
	private String domain;

	/**
	 *
	 * @param tel (휴대전화번호)
	 * 입력들어온 휴대전화번호로 인증문자 발송
	 */
	@Override
	@Transactional
	public void sendAuthenticationNumber(String tel) {
		DefaultMessageService messageService = NurigoApp.INSTANCE.initialize(
			apiKey, apiSecret, domain);

		String randomAuthNum = RandomStringUtils.randomNumeric(6);


		Message message = new Message();
		message.setFrom("01042121037");
		message.setTo(tel);
		message.setText("본인확인 인증번호" + "[" + randomAuthNum + "]를 화면에 입력해주세요. 타인 노출 금지");

		Auth auth = Auth.builder()
			.tel(tel)
			.authNum(randomAuthNum)
			.expiredAt(LocalDateTime.now().plusMinutes(3))
			.build();

		// 이미 있으면 기존 인증 지우기 (재발송의 경우)
		if (authRepository.existsByTel(tel))
			authRepository.deleteByTel(tel);

		try {
			messageService.send(message);
			authRepository.save(auth);
		} catch (NurigoMessageNotReceivedException exception) {
			System.out.println(exception.getFailedMessageList());
			System.out.println(exception.getMessage());
		} catch (Exception exception) {
			System.out.println(exception.getMessage());
		}
	}

	/**
	 * @param checkAuthRequest (휴대전화번호, 인증번호)
	 * 입력된 인증번호가 휴대전화번호와 일치하는지 확인한 후 해당 일치한다면 성공토큰을 세선에, 아니라면 넣지 않는다
	 */
	@Override
	@Transactional
	public SuccessTokenResponse checkAuthenticationNumber(CheckAuthRequest checkAuthRequest) {
		Auth auth = authRepository.findByTel(checkAuthRequest.getTel())
			.orElseThrow(() -> new NotFoundException(ResponseCode.NOT_FOUND_ERROR));

		try { // 현재시간(now) 이 유효기간을 지났다면 TimeOutException, 인증번호 불일치라면 NotFoundException
			LocalDateTime now = LocalDateTime.now();
			if (now.isAfter(auth.getExpiredAt())) {
				throw new TimeOutException(ResponseCode.TIME_OUT_EXCEPTION);
			} else if (!auth.getAuthNum().equals(checkAuthRequest.getAuthNum())) {
				throw new NotFoundException(ResponseCode.NOT_FOUND_ERROR);
			}
		} finally {
			authRepository.deleteByTel(checkAuthRequest.getTel());
		}

		SuccessToken successToken = SuccessToken.builder()
			.tel(checkAuthRequest.getTel())
			.token(UUID.randomUUID().toString().replaceAll("\\-", ""))
			.createAt(LocalDateTime.now())
			.expiredAt(LocalDateTime.now().plusMinutes(50))
			.build();

		successTokenRepository.save(successToken);

		return SuccessTokenResponse.builder()
			.token(successToken.getToken())
			.build();
	}

	@Override
	public void sendTempPassword(ResetPassword resetPassword) {
		DefaultMessageService messageService = NurigoApp.INSTANCE.initialize(
				apiKey, apiSecret, domain);

		Auth auth = authRepository.findByTel(resetPassword.getTel())
				.orElseThrow(() -> new NotFoundException(ResponseCode.NOT_FOUND_ERROR));

		try { // 현재시간(now) 이 유효기간을 지났다면 TimeOutException, 인증번호 불일치라면 NotFoundException
			LocalDateTime now = LocalDateTime.now();
			if (now.isAfter(auth.getExpiredAt())) {
				throw new TimeOutException(ResponseCode.TIME_OUT_EXCEPTION);
			} else if (!auth.getAuthNum().equals(resetPassword.getAuthNum())) {
				throw new NotFoundException(ResponseCode.NOT_FOUND_ERROR);
			}
		} finally {
			authRepository.deleteByTel(resetPassword.getTel());
		}

		// 입력받은 아이디를 통해 유저객체 찾아오기
		User user = userRepository.findByLoginId(resetPassword.getLoginId())
				.orElseThrow(() -> new NotFoundException(ResponseCode.NOT_FOUND_ERROR));
		// 문자+숫자 혼용된 8자리 임시 비밀번호
		String randomPassword = RandomStringUtils.randomAlphanumeric(8);

		Message message = new Message();
		message.setFrom("01042121037");
		message.setTo(resetPassword.getTel());
		message.setText("임시 비밀번호는 " + "[" + randomPassword + "] 입니다. 로그인 후 반드시 비밀번호를 변경해주세요. 타인 노출 금지");

		// 메세지 보내고 해당 유저객체의 비밀번호를 임시비밀번호로 변경한다 (암호화하여)
		try {
			messageService.send(message);
			user.setPassword(bCryptPasswordEncoder.encode(randomPassword));
		} catch (NurigoMessageNotReceivedException exception) {
			System.out.println(exception.getFailedMessageList());
			System.out.println(exception.getMessage());
		} catch (Exception exception) {
			System.out.println(exception.getMessage());
		}

	}
}
