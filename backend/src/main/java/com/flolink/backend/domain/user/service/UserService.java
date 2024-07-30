package com.flolink.backend.domain.user.service;

import com.flolink.backend.domain.user.dto.request.FindUserIdRequest;
import com.flolink.backend.domain.user.dto.request.JoinUserRequest;
import com.flolink.backend.domain.user.dto.request.UpdateUserPasswordRequest;

public interface UserService {

	void joinProcess(JoinUserRequest joinUserRequest);

	boolean isExistLoginId(String loginId);

	String findMyId(FindUserIdRequest findUserIdRequest);

	void updateMyPassword(UpdateUserPasswordRequest UpdateUserPasswordRequest);
}
