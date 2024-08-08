package com.flolink.backend.domain.user.dto.response;

import java.math.BigDecimal;

import com.flolink.backend.domain.user.entity.User;
import com.flolink.backend.domain.user.entity.enumtype.EmotionType;
import com.flolink.backend.domain.user.entity.enumtype.ProfileType;
import com.flolink.backend.domain.user.entity.enumtype.RoleType;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class UserInfoResponse {
	private Integer myRoomId;
	private String nickname;
	private BigDecimal point;
	private RoleType role;
	private ProfileType profile;
	private EmotionType emotion;
	private String statusMessage;

	public static UserInfoResponse fromEntity(User User) {
		return UserInfoResponse.builder()
			.myRoomId(User.getMyRoom().getMyRoomId())
			.nickname(User.getNickname())
			.point(User.getPoint())
			.role(User.getRole())
			.profile(User.getProfile())
			.emotion(User.getEmotion())
			.statusMessage(User.getStatusMessage())
			.build();
	}
}


