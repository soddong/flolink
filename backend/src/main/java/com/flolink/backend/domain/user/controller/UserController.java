package com.flolink.backend.domain.user.controller;

import com.flolink.backend.domain.user.dto.request.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.flolink.backend.domain.user.dto.response.CustomUserDetails;
import com.flolink.backend.domain.user.dto.response.FindUserIdResponse;
import com.flolink.backend.domain.user.dto.response.UserInfoResponse;
import com.flolink.backend.domain.user.service.UserService;
import com.flolink.backend.global.common.CommonResponse;
import com.flolink.backend.global.common.ResponseCode;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@Tag(name = "User API", description = "회원가입 및 정보확인을 위한 API")
public class UserController {

	private final UserService userService;

	@Operation(summary = "아이디 중복 확인", description = "입력받은 아이디와 동일한 아이디가 있는지 확인")
	@GetMapping("/duplicate/{loginId}")
	public ResponseEntity<?> checkUserName(@PathVariable String loginId) {
		log.info("===아이디 중복 확인 START===");
		boolean result = userService.isExistLoginId(loginId);
		log.info("===아이디 중복 확인 END===");
		return ResponseEntity.ok(CommonResponse.of(ResponseCode.COMMON_SUCCESS, result));
	}

	@Operation(summary = "회원가입", description = "회원가입이다. 여기서 token은 휴대폰 인증을 성공하고 발급받은 successToken")
	@PostMapping("/join")
	public ResponseEntity<?> join(@RequestBody JoinUserRequest joinUserRequest) {
		log.info("===회원가입 START===");
		userService.joinProcess(joinUserRequest);
		log.info("===회원가입 END===");
		return ResponseEntity.ok(CommonResponse.of(ResponseCode.COMMON_SUCCESS));
	}

	@Operation(summary = "아이디 찾기", description = "여기서의 토큰은 휴대폰 인증 성공 후 발급받는 SuccessToken")
	@PostMapping("/find/id")
	public ResponseEntity<?> findId(@RequestBody FindUserIdRequest findUserIdRequest) {
		log.info("===아이디 찾기 Start===");
		FindUserIdResponse myId = userService.findMyId(findUserIdRequest);
		log.info("===아이디 찾기 END===");
		return ResponseEntity.ok(CommonResponse.of(ResponseCode.COMMON_SUCCESS, myId));
	}

	@Operation(summary = "비밀번호찾기 본인 확인_비밀번호 분실", description = "비밀번호 찾기에서 휴대폰인증을 통해 본인임을 통과받는다.")
	@PostMapping("/forgot/find/pw")
	public ResponseEntity<?> forgotPasswordAuth(@RequestBody ForgotPasswordAuthRequest forgotPasswordAuthRequest) {
		log.info("===비밀번호 찾기 본인확인 START===");
		userService.forgotPasswordAuth(forgotPasswordAuthRequest);
		log.info("===비밀번호 찾기 본인확인 END===");
		return ResponseEntity.ok(CommonResponse.of(ResponseCode.COMMON_SUCCESS));
	}

	@Operation(summary = "비밀번호 변경_비밀번호 분실", description = "위에서 통과 후 발급받은 토큰을 들고 여기에 함께 들고온다.")
	@PutMapping("/forgot/reset/pw")
	public ResponseEntity<?> forgotPasswordChange(
		@RequestBody ForgotPasswordChangeRequest forgotPasswordChangeRequest) {
		log.info("===비밀번호 수정(비밀번호 분실) START===");
		userService.forgotPasswordChange(forgotPasswordChangeRequest);
		log.info("===비밀번호 수정(비밀번호 분실) END===");
		return ResponseEntity.ok(CommonResponse.of(ResponseCode.COMMON_SUCCESS));
	}

	@Operation(summary = "비밀번호 변경", description = "로그인한 인원의 비밀번호 변경, OAuth 로그인 유저 사용불가")
	@PutMapping("/reset/pw")
	public ResponseEntity<?> changePassword(
		/*1*/ @RequestBody ChangePasswordRequest changePasswordRequest,
		/*2*/ Authentication authentication) {
		CustomUserDetails customUserDetails = (CustomUserDetails)authentication.getPrincipal();
		log.info("===비밀번호 수정 START===");
		userService.passwordChange(changePasswordRequest, customUserDetails.getUserId());
		log.info("===비밀번호 수정 END===");
		return ResponseEntity.ok(CommonResponse.of(ResponseCode.COMMON_SUCCESS));
	}

	@Operation(summary = "회원정보 조회", description = "로그인 한 사람의 회원정보를 반환, 회원정보 입력 불필요")
	@GetMapping("/myInfo")
	public ResponseEntity<?> myInfo(Authentication authentication) {
		CustomUserDetails userDetails = (CustomUserDetails)authentication.getPrincipal();
		log.info("===회원정보 조회 START===");
		UserInfoResponse userInfoResponse = userService.getUserInfo(userDetails.getUserId());
		log.info("===회원정보 조회 END===");
		return ResponseEntity.ok(CommonResponse.of(ResponseCode.COMMON_SUCCESS, userInfoResponse));
	}

	@Operation(summary = "회원 탈퇴", description = "로그인한 사람의 회원정보 탈퇴 (SoftDelete), 회원정보 입력 불필요")
	@DeleteMapping("/myInfo")
	public ResponseEntity<?> deleteInfo(Authentication authentication) {
		CustomUserDetails userDetails = (CustomUserDetails)authentication.getPrincipal();
		log.info("===회원정보 삭제 START===");
		userService.deleteUserInfo(userDetails.getUserId());
		log.info("===회원정보 삭제 END===");
		return ResponseEntity.ok(CommonResponse.of(ResponseCode.COMMON_SUCCESS));
	}

	@Operation(summary = "닉네임 변경", description = "닉네임을 수정한다. 빈 문자열 불가")
	@PutMapping("/myInfo/nickname")
	public ResponseEntity<?> updateNickname(@RequestBody NicknameRequest nicknameRequest,
		Authentication authentication) {
		CustomUserDetails userDetails = (CustomUserDetails)authentication.getPrincipal();
		log.info("===닉네임 변경 START===");
		userService.modifyNickname(nicknameRequest.getNickname(), userDetails.getUserId());
		log.info("===닉네임 변경 END===");
		return ResponseEntity.ok(CommonResponse.of(ResponseCode.COMMON_SUCCESS));
	}

	@Operation(summary = "상태메세지 변경", description = "상태메세지를 수정한다.")
	@PutMapping("/myInfo/message")
	public ResponseEntity<?> updateMessage(@RequestBody StatusMessageRequest statusMessageRequest,
		Authentication authentication) {
		CustomUserDetails userDetails = (CustomUserDetails)authentication.getPrincipal();
		log.info("===상태 메세지 변경 START===");
		userService.modifyMessage(statusMessageRequest, userDetails.getUserId());
		log.info("===상태 메세지 변경 END===");
		return ResponseEntity.ok(CommonResponse.of(ResponseCode.COMMON_SUCCESS));
	}

	@Operation(summary = "프로필 사진 및 기분 상태 변경", description = "사전에 정의된 프로필사진 및 기분상태를 변경한다.")
	@PutMapping("/myInfo/profile/emotion")
	public ResponseEntity<?> updateProfileAndEmotion(@RequestBody ProfileAndEmotionRequest profileAndEmotionRequest,
													 Authentication authentication) {
		CustomUserDetails userDetails = (CustomUserDetails)authentication.getPrincipal();
		log.info("===프로필 및 기분 변경 START===");
		userService.modifyProfileAndEmotion(profileAndEmotionRequest, userDetails.getUserId());
		log.info("===프로필 및 기분 변경 END===");
		return ResponseEntity.ok(CommonResponse.of(ResponseCode.COMMON_SUCCESS));
	}

}
