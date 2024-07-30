package com.flolink.backend.domain.user.dto.request;

import lombok.Getter;

@Getter
public class FindUserIdRequest {
	private String userName;
	private String tel;
	private String token;
}
