package com.flolink.backend.domain.user.service;

import java.math.BigDecimal;

import com.flolink.backend.domain.user.dto.request.*;
import com.flolink.backend.domain.user.dto.response.FindUserIdResponse;
import com.flolink.backend.domain.user.dto.response.UserInfoResponse;
import com.flolink.backend.domain.user.entity.User;
import com.flolink.backend.global.auth.dto.response.OAuth.UserDTO;

public interface UserService {

	void joinProcess(JoinUserRequest joinUserRequest);

	boolean isExistLoginId(String loginId);

	UserDTO findUserByUserId(Integer userId);

	FindUserIdResponse findMyId(FindUserIdRequest findUserIdRequest);

	void forgotPasswordAuth(ForgotPasswordAuthRequest ForgotPasswordAuthRequest);

	void forgotPasswordChange(ForgotPasswordChangeRequest forgotPasswordChangeRequest);

	void passwordChange(ChangePasswordRequest changePasswordRequest, Integer userId);

	UserInfoResponse getUserInfo(Integer userId);

	void deleteUserInfo(Integer userId);

	void modifyNickname(String nickname, Integer userId);

	void modifyMessage(StatusMessageRequest statusMessageRequest, Integer userId);
	
	void modifyProfileAndEmotion(ProfileAndEmotionRequest profileAndEmotionRequest, Integer userId);

	void addPoint(Integer userId, BigDecimal point);
}
