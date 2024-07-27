package com.flolink.backend.domain.user.service;

import com.flolink.backend.domain.user.dto.request.JoinUserRequest;
import com.flolink.backend.domain.user.dto.request.LoginIdRequset;

public interface UserService {

	void joinProcess(JoinUserRequest joinUserRequest);

	boolean isExistId(LoginIdRequset loginIdRequset);
}
