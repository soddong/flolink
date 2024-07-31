package com.flolink.backend.domain.auth.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.flolink.backend.domain.auth.dto.request.CheckAuthRequest;
import com.flolink.backend.domain.auth.dto.response.SuccessTokenResponse;
import com.flolink.backend.domain.auth.service.AuthService;
import com.flolink.backend.global.common.CommonResponse;
import com.flolink.backend.global.common.ResponseCode;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequestMapping("/auth")
@RequiredArgsConstructor
@Tag(name = "Auth API", description = "인증 관련 API")
public class AuthController {

	private final AuthService authService;

	@Operation(summary = "인증번호 발송", description = "작성한 휴대전홥 번호로 인증번호 발송")
	@PostMapping("/authentication")
	public ResponseEntity<?> sendAuth(@RequestBody String tel) {
		log.info("===휴대폰 본인인증번호 전송 START===");
		authService.sendAuthenticationNumber(tel);
		log.info("===휴대폰 본인인증번호 전송 END===");
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@Operation(summary = "인증번호 확인", description = "발송한 인증번호와 일치하는지 확인")
	@PostMapping("/authentication/check")
	public ResponseEntity<?> checkAuth(@RequestBody CheckAuthRequest checkAuthRequest) {
		log.info("===인증번호 일치 확인 START===");
		SuccessTokenResponse token = authService.checkAuthenticationNumber(checkAuthRequest);
		log.info("===인증번호 일치 확인 END===");
		return ResponseEntity.ok(CommonResponse.of(ResponseCode.COMMON_SUCCESS, token));
	}
}

