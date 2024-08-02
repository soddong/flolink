package com.flolink.backend.domain.user.service;

import com.flolink.backend.domain.user.dto.request.ChangePasswordRequest;
import com.flolink.backend.domain.user.dto.request.FindUserIdRequest;
import com.flolink.backend.domain.user.dto.request.ForgotPasswordAuthRequest;
import com.flolink.backend.domain.user.dto.request.ForgotPasswordChangeRequest;
import com.flolink.backend.domain.user.dto.request.JoinUserRequest;
import com.flolink.backend.domain.user.dto.response.FindUserIdResponse;
import com.flolink.backend.domain.user.dto.response.UserInfoResponse;

public interface UserService {

	void joinProcess(JoinUserRequest joinUserRequest);

	boolean isExistLoginId(String loginId);

	FindUserIdResponse findMyId(FindUserIdRequest findUserIdRequest);

	void forgotPasswordAuth(ForgotPasswordAuthRequest ForgotPasswordAuthRequest);

	void forgotPasswordChange(ForgotPasswordChangeRequest forgotPasswordChangeRequest);

	void passwordChange(ChangePasswordRequest changePasswordRequest, int userId);

	UserInfoResponse getUserInfo(int userId);

	void deleteUserInfo(int userId);

	void modifyNickname(String nickname, int userId);

}
