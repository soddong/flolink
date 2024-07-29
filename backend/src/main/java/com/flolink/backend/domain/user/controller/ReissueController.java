package com.flolink.backend.domain.user.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.flolink.backend.domain.auth.repository.RefreshRepository;
import com.flolink.backend.domain.user.service.ReissueService;
import com.flolink.backend.global.common.CommonResponse;
import com.flolink.backend.global.common.ResponseCode;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
public class ReissueController {

	private final ReissueService reissueService;
	private final RefreshRepository refreshRepository;

	@PostMapping("/reissue")
	public ResponseEntity<?> reissue(HttpServletRequest request, HttpServletResponse response) {
		log.info("===AccessToken 재발급 START===");
		reissueService.reissue(request, response);
		log.info("===AccessToken 재발급 END===");
		return ResponseEntity.ok(CommonResponse.of(ResponseCode.COMMON_SUCCESS));
	}
}
