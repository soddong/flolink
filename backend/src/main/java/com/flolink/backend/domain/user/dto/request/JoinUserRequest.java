package com.flolink.backend.domain.user.dto.request;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class JoinUserRequest {
	private String userName;
	private String password;
	private String realName;
	private String nickName;
	private String tel;
	private String token;

}
