package com.flolink.backend.domain.user.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class FindUserIdResponse {
	private String LoginId;
}
