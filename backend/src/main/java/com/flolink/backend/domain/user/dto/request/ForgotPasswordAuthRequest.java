package com.flolink.backend.domain.user.dto.request;

import lombok.Getter;

@Getter
public class ForgotPasswordAuthRequest {
	private String loginId;
	private String userName;
	private String tel;
	private String token;
}
