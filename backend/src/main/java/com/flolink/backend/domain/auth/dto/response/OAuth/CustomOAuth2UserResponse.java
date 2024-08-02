package com.flolink.backend.domain.auth.dto.response.OAuth;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

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

		Collection<GrantedAuthority> collection = new ArrayList<>();

		collection.add(new GrantedAuthority() {

			@Override
			public String getAuthority() {

				return userDTO.getRole();
			}
		});

		return collection;
	}

	@Override
	public String getName() {

		return userDTO.getUsername();
	}

	public String getLoginId() {
		return userDTO.getLoginId();
	}

	public int getMyRoomId() {
		return userDTO.getMyRoomId();
	}

}
