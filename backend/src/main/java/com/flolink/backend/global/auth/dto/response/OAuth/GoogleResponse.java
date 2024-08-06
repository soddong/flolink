package com.flolink.backend.global.auth.dto.response.OAuth;

import java.util.Map;

import com.flolink.backend.domain.user.entity.enumtype.RoleType;

public class GoogleResponse implements OAuth2Response {

	private final Map<String, Object> attribute;

	public GoogleResponse(Map<String, Object> attribute) {
		this.attribute = attribute;
	}

	public RoleType getRoleType() {
		return RoleType.GOOGLE;
	}

	@Override
	public String getProvider() {
		return "Google";
	}

	@Override
	public String getProviderId() {
		return attribute.get("sub").toString();
	}

	@Override
	public String getEmail() {
		return attribute.get("email").toString();
	}

	@Override
	public String getName() {
		return attribute.get("name").toString();
	}
}
