package com.flolink.backend.domain.auth.dto.response.OAuth;

import com.flolink.backend.domain.myroom.entity.MyRoom;
import com.flolink.backend.domain.user.entity.enumtype.RoleType;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserDTO {
	private int userId;
	private MyRoom myRoom;
	private RoleType roleType;
	private String username;
	private String role;

}
