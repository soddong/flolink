package com.flolink.backend.domain.auth.service;

import com.flolink.backend.domain.auth.dto.request.CheckAuthRequest;

public interface AuthService {

	void sendAuthenticationNumber(String tel);

	String checkAuthenticationNumber(CheckAuthRequest checkAuthRequest);

}
