package com.flolink.backend.domain.auth.dto.request;

import lombok.Getter;

@Getter
public class CheckAuthRequest {
	private String tel;
	private String authNum;
}
