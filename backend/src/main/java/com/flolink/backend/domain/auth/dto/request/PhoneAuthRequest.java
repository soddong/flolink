package com.flolink.backend.domain.auth.dto.request;

import java.time.LocalDateTime;

import com.flolink.backend.domain.auth.entity.Auth;

import lombok.Getter;

// 인증번호 수신을 위한 휴대전화번호 입력

@Getter
public class PhoneAuthRequest {
	private String tel;
	private final LocalDateTime expiredAt = LocalDateTime.now().plusMinutes(5);

	public Auth toEntity(String authNum) {
		return Auth.builder()
			.authNum(authNum)
			.tel(tel)
			.expiredAt(expiredAt)
			.build();
	}
}
