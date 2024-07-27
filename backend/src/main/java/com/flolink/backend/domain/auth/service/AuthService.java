package com.flolink.backend.domain.auth.service;

import com.flolink.backend.domain.auth.dto.request.CheckAuthRequest;
import com.flolink.backend.domain.auth.dto.request.PhoneAuthRequest;

public interface AuthService {

	void sendAuthenticationNumber(PhoneAuthRequest phoneAuthRequest);

	void checkAuthenticationNumber(CheckAuthRequest checkAuthRequest);

}
