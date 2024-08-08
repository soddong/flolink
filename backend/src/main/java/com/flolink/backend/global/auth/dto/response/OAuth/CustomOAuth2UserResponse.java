package com.flolink.backend.global.auth.dto.response.OAuth;

import java.util.Collection;
import java.util.Map;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

import com.flolink.backend.domain.myroom.entity.MyRoom;
import com.flolink.backend.domain.user.entity.enumtype.RoleType;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class CustomOAuth2UserResponse implements OAuth2User {

	private final UserDTO userDTO;

	@Override
	public Map<String, Object> getAttributes() {

		return null;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {

		return null;
	}

	@Override
	public String getName() {

		return userDTO.getUsername();
	}

	public boolean getUseYn() {
		return userDTO.isUseYn();
	}

	public RoleType getRoleType() {
		return userDTO.getRole();
	}

	public int getUserId() {
		return userDTO.getUserId();
	}

	public MyRoom getMyRoom() {
		return userDTO.getMyRoom();
	}

}
