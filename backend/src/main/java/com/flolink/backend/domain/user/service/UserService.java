package com.flolink.backend.domain.user.service;

import com.flolink.backend.domain.user.dto.request.FindUserIdRequest;
import com.flolink.backend.domain.user.dto.request.JoinUserRequest;
import com.flolink.backend.domain.user.dto.request.UpdatePasswordCheckRequest;
import com.flolink.backend.domain.user.dto.request.UpdatePasswordRequest;
import com.flolink.backend.domain.user.dto.response.FindUserIdResponse;
import com.flolink.backend.domain.user.dto.response.UserInfoResponse;

public interface UserService {

	void joinProcess(JoinUserRequest joinUserRequest);

	boolean isExistLoginId(String loginId);

	FindUserIdResponse findMyId(FindUserIdRequest findUserIdRequest);

	void updateMyPasswordCheck(UpdatePasswordCheckRequest UpdatePasswordCheckRequest);

	void updateMyPassword(UpdatePasswordRequest updatePasswordRequest);

	UserInfoResponse getUserInfo(int userId);

	void deleteUserInfo(int userId);

	void modifyNickname(String nickname, int userId);

}
