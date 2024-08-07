package com.flolink.backend.domain.user.dto.request;

import com.flolink.backend.domain.user.entity.enumtype.EmotionType;

import lombok.Data;

@Data
public class EmotionRequest {
	private EmotionType emotion;
}
