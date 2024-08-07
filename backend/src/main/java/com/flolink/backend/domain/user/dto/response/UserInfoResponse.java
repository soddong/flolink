package com.flolink.backend.domain.user.dto.response;

import java.math.BigDecimal;

import com.flolink.backend.domain.user.entity.enumtype.EmotionType;
import com.flolink.backend.domain.user.entity.enumtype.ProfileType;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class UserInfoResponse {
	private String nickname;
	private BigDecimal point;
	private ProfileType profile;
	private EmotionType emotion;
}


