package com.flolink.backend.domain.user.dto.request;

import com.flolink.backend.domain.user.entity.User;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class JoinUserRequest {
	private String loginId;
	private String password;
	private String userName;
	private String nickName;
	private String tel;

	public User toEntity() {
		return User.builder()
			.loginId(loginId)
			.password(password)
			.userName(userName)
			.nickname(nickName)
			.tel(tel)
			.build();
	}
}
