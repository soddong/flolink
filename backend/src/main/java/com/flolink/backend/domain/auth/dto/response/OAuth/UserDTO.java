package com.flolink.backend.domain.auth.dto.response.OAuth;

import com.flolink.backend.domain.user.entity.enumtype.RoleType;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserDTO {
	private int userId;
	private int myRoomId;
	private RoleType roleType;
	private String username;
	private String role;

}
