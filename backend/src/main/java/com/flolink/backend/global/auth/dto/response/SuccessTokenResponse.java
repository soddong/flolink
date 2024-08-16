package com.flolink.backend.global.auth.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SuccessTokenResponse {
	private String token;
}
