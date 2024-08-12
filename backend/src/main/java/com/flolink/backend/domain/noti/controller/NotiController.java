package com.flolink.backend.domain.noti.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.flolink.backend.domain.noti.dto.response.NotiResponse;
import com.flolink.backend.domain.noti.service.NotiService;
import com.flolink.backend.domain.user.dto.response.CustomUserDetails;
import com.flolink.backend.global.common.CommonResponse;
import com.flolink.backend.global.common.ResponseCode;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/noti")
@RequiredArgsConstructor
public class NotiController {

	private final NotiService notiService;

	@GetMapping("")
	public ResponseEntity<?> getNoti(Authentication authentication, @RequestParam final Integer userRoomId) {
		CustomUserDetails userDetails = (CustomUserDetails)authentication.getPrincipal();
		Integer userId = userDetails.getUserId();
		List<NotiResponse> notiResponses = notiService.getNoti(userId, userRoomId);
		return ResponseEntity.ok(CommonResponse.of(ResponseCode.COMMON_SUCCESS, notiResponses));
	}

}
