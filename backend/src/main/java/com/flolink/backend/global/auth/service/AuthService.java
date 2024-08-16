package com.flolink.backend.global.auth.service;

import com.flolink.backend.global.auth.dto.request.CheckAuthRequest;
import com.flolink.backend.global.auth.dto.request.ResetPassword;
import com.flolink.backend.global.auth.dto.response.SuccessTokenResponse;

public interface AuthService {

	void sendAuthenticationNumber(String tel);

	SuccessTokenResponse checkAuthenticationNumber(CheckAuthRequest checkAuthRequest);

	void sendTempPassword(ResetPassword resetPassword);

	void logout(String token);
}
