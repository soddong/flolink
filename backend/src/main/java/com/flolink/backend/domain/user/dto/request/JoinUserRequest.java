package com.flolink.backend.domain.user.dto.request;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class JoinUserRequest {
	private String loginId;
	private String password;
	private String userName;
	private String nickname;
	private String tel;
	private String token;

}
