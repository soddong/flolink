package com.flolink.backend.domain.user.dto.request;

import lombok.Getter;

@Getter
public class ChangePasswordRequest {
	private String loginId;
	private String newPassword;
	private String newPasswordConfirm;
}
