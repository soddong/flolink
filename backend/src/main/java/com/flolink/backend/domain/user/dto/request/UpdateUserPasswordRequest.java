package com.flolink.backend.domain.user.dto.request;

import lombok.Getter;

@Getter
public class UpdateUserPasswordRequest {
	private String loginId;
	private String userName;
	private String tel;
	private String authNum;
}
