package com.flolink.backend.domain.auth.service;

import com.flolink.backend.domain.auth.dto.request.CheckAuthRequest;
import com.flolink.backend.domain.auth.dto.response.SuccessTokenResponse;

public interface AuthService {

	void sendAuthenticationNumber(String tel);

	SuccessTokenResponse checkAuthenticationNumber(CheckAuthRequest checkAuthRequest);

}
