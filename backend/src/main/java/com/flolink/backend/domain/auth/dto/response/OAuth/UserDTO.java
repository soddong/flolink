package com.flolink.backend.domain.auth.dto.response.OAuth;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserDTO {
	private String loginId;
	private String name;

}
