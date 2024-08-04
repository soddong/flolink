package com.flolink.backend.domain.auth.dto.response.OAuth;

import com.flolink.backend.domain.user.entity.enumtype.RoleType;

import java.util.Map;

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
