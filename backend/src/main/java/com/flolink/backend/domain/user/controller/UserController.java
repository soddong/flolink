package com.flolink.backend.domain.user.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.flolink.backend.domain.user.dto.request.JoinUserRequest;
import com.flolink.backend.domain.user.service.UserService;
import com.flolink.backend.global.common.CommonResponse;
import com.flolink.backend.global.common.ResponseCode;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@Tag(name = "", description = "")
public class UserController {

	private final UserService userService;

	@Operation(summary = "아이디 중복 확인")
	@GetMapping("/duplicate/{username}")
	public ResponseEntity<?> checkUserName(@PathVariable String username) {
		log.info("===아이디 중복 확인 START===");
		boolean result = userService.isExistUserName(username);
		log.info("===아이디 중복 확인 END===");
		return ResponseEntity.ok(CommonResponse.of(ResponseCode.COMMON_SUCCESS, result));
	}

	@Operation(summary = "회원가입")
	@PostMapping("/join")
	public ResponseEntity<?> join(@RequestBody JoinUserRequest joinUserRequest) {
		log.info("===회원가입 START===");
		userService.joinProcess(joinUserRequest);
		log.info("===회원가입 END===");
		return ResponseEntity.ok(CommonResponse.of(ResponseCode.COMMON_SUCCESS));
	}

}
