package com.flolink.backend.domain.user.controller;

import com.flolink.backend.domain.user.dto.request.JoinUserRequest;
import com.flolink.backend.domain.user.entity.User;
import com.flolink.backend.global.common.CommonResponse;
import com.flolink.backend.global.common.ResponseCode;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.flolink.backend.domain.user.service.UserService;

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
	@GetMapping("/duplicate/{loginId}")
	public ResponseEntity<?> checkLoginId(@PathVariable String loginId) {
		log.info("===아이디 중복 확인 START===");
		boolean result = userService.isExistId(loginId);
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

	@Operation(summary = "로그인")
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LoginUserRequest loginUserRequest){
		log.info("===로그인 START===");

		log.info("===로그인 END===");
		return ResponseEntity.ok(CommonResponse.of(ResponseCode.COMMON_SUCCESS));
	}

}
