package com.flolink.backend.domain.user.dto.request;

import lombok.Getter;

@Getter
public class ForgotPasswordChangeRequest {
	private String loginId;
	private String newPassword;
	private String newPasswordConfirm;
	private String token;
}
