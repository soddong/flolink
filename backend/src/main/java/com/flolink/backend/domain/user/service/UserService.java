package com.flolink.backend.domain.user.service;

import com.flolink.backend.domain.user.dto.request.JoinUserReq;
import com.flolink.backend.domain.user.dto.request.LoginIdReq;

public interface UserService {

	void joinProcess(JoinUserReq joinUserReq);

	boolean isExistId(LoginIdReq loginIdReq);
}
