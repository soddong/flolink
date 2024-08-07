package com.flolink.backend.domain.myroom.service;

import com.flolink.backend.domain.myroom.dto.response.MyRoomResponse;
import com.flolink.backend.domain.myroom.entity.MyRoom;

public interface MyRoomService {
	MyRoom createMyRoom();

	MyRoomResponse getMyRoom(Integer userRoomId);

	MyRoomResponse equipItem(Integer userId, Integer hasItemId);

	MyRoomResponse unequipItem(Integer userId, Integer hasItemId);
}
