package com.flolink.backend.domain.user.dto.request;

import lombok.Getter;

@Getter
public class LoginUserRequest {
	private String loginId;
	private String password;
}
