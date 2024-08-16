package com.flolink.backend.domain.noti.service;

import java.util.List;

import com.flolink.backend.domain.noti.dto.response.NotiResponse;

public interface NotiService {
	List<NotiResponse> getNoti(final Integer userId, final Integer userRoomId);
}
