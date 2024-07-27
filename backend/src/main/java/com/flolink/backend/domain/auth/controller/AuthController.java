package com.flolink.backend.domain.auth.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.flolink.backend.domain.auth.dto.request.CheckAuthRequest;
import com.flolink.backend.domain.auth.dto.request.PhoneAuthRequest;
import com.flolink.backend.domain.auth.service.AuthService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequestMapping("/auth")
@RequiredArgsConstructor
@Tag(name = "", description = "")
public class AuthController {

	private final AuthService authService;

	@Operation(summary = "휴대폰 본인인증번호 전송")
	@PostMapping("/authentication")
	public ResponseEntity<?> sendAuth(@RequestBody PhoneAuthRequest phoneAuthRequest) {

		authService.sendAuthenticationNumber(phoneAuthRequest);

		return new ResponseEntity<>(HttpStatus.OK);
	}

	@Operation(summary = "발송한 인증번호와 일치하는지 확인")
	@PostMapping("/authentication/check")
	public ResponseEntity<?> checkAuth(@RequestBody CheckAuthRequest checkAuthRequest) {
		authService.checkAuthenticationNumber(checkAuthRequest);
		return new ResponseEntity<>(HttpStatus.OK);
	}
}

