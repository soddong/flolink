package com.flolink.backend.domain.auth.dto.response.OAuth;

import java.util.Collection;
import java.util.Map;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

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

	public RoleType getRoleType() {
		return userDTO.getRoleType();
	}

	public int getUserId() {
		return userDTO.getUserId();
	}

	public int getMyRoomId() {
		return userDTO.getMyRoomId();
	}

}
