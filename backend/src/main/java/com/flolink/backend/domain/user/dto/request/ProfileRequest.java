package com.flolink.backend.domain.user.dto.request;

import com.flolink.backend.domain.user.entity.enumtype.ProfileType;

import lombok.Data;

@Data
public class ProfileRequest {
	private ProfileType profile;
}
