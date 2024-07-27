package com.flolink.backend.domain.user.service;

import com.flolink.backend.domain.user.dto.request.JoinUserRequest;

public interface UserService {

	void joinProcess(JoinUserRequest joinUserRequest);

	boolean isExistId(String loginId);
}
