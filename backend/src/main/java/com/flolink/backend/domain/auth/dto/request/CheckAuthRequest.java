package com.flolink.backend.domain.auth.dto.request;

import java.time.LocalDateTime;

import lombok.Getter;

@Getter
public class CheckAuthRequest {
	private String tel;
	private String authNum;
	private final LocalDateTime expiredAt = LocalDateTime.now();
}
