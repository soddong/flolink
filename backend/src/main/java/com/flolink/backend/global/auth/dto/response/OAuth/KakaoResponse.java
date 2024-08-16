package com.flolink.backend.global.auth.dto.response.OAuth;

import java.util.Map;

import com.flolink.backend.domain.user.entity.enumtype.RoleType;

public class KakaoResponse implements OAuth2Response {

	private final Map<String, Object> attributes;

	public KakaoResponse(Map<String, Object> attributes) {
		this.attributes = (Map<String, Object>)attributes;
	}

	public RoleType getRoleType() {
		return RoleType.KAKAO;
	}

	@Override
	public String getProvider() {
		return "Kakao";
	}

	@Override
	public String getProviderId() {
		return attributes.get("id").toString();
	}

	@Override
	public String getEmail() {
		return "";
	}

	@Override
	public String getName() {
		// `kakao_account` 객체를 가져옵니다.
		Map<String, Object> kakaoAccount = (Map<String, Object>)attributes.get("kakao_account");

		// `profile` 객체를 가져옵니다.
		Map<String, Object> profile = (Map<String, Object>)kakaoAccount.get("profile");

		// `nickname` 값을 가져옵니다.
		return profile.get("nickname").toString();
	}
}
