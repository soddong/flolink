package com.flolink.backend.domain.auth.dto.request;

import com.flolink.backend.domain.auth.entity.Auth;

import lombok.Getter;

@Getter
public class PhoneAuthRequest {
	private String tel;

	public Auth toEntity(String authNum) {
		return Auth.builder()
			.authNum(authNum)
			.tel(tel)
			.build();
	}
}
