package com.flolink.backend.domain.user.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.flolink.backend.domain.user.dto.request.LoginIdRequset;
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
	@PostMapping("")
	public ResponseEntity<?> checkLoginId(@RequestBody LoginIdRequset loginIdRequset) {
		boolean result = userService.isExistId(loginIdRequset);
		return new ResponseEntity<>(result, result ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
	}
}
