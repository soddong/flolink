package com.flolink.backend.domain.noti.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.flolink.backend.domain.noti.dto.response.NotiResponse;
import com.flolink.backend.domain.noti.repository.NotiRepository;
import com.flolink.backend.domain.room.entity.UserRoom;
import com.flolink.backend.domain.room.service.RoomService;
import com.flolink.backend.global.common.ResponseCode;
import com.flolink.backend.global.common.exception.UnAuthorizedException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class NotiServiceImpl implements NotiService {
	private final NotiRepository notiRepository;
	private final RoomService roomService;

	@Override
	public List<NotiResponse> getNoti(final Integer userId, final Integer userRoomId) {

		UserRoom userRoom = roomService.findUserRoomByUserRoomId(userRoomId);
		if (!userRoom.getUser().getUserId().equals(userId)) {
			throw new UnAuthorizedException(ResponseCode.USER_ROOM_NOT_FOUND);
		}
		return userRoom.getNotiList().stream().map(NotiResponse::fromEntity).toList();
	}
}
