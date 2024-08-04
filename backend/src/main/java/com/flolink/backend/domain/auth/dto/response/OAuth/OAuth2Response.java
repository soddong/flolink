package com.flolink.backend.domain.auth.dto.response.OAuth;

import com.flolink.backend.domain.user.entity.enumtype.RoleType;

public interface OAuth2Response {

	RoleType getRoleType();

	//제공자 (Ex. naver, google, ...)
	String getProvider();

	//제공자에서 발급해주는 아이디(번호)
	String getProviderId();

	//이메일
	String getEmail();

	//사용자 실명 (설정한 이름)
	String getName();
}
