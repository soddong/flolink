package com.flolink.backend.global.auth.dto.response.OAuth;

public interface OAuth2Response {

	//제공자 (Ex. naver, google, ...)
	String getProvider();

	//제공자에서 발급해주는 아이디(번호)
	String getProviderId();

	String getEmail();

	//사용자 실명 (설정한 이름)
	String getName();
}
