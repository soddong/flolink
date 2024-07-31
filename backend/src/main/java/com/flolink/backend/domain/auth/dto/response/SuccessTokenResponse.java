package com.flolink.backend.domain.auth.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SuccessTokenResponse {
	private String token;
}
