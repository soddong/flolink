package com.flolink.backend.domain.myroom.service;

import com.flolink.backend.domain.myroom.dto.request.HasItemRequest;
import com.flolink.backend.domain.myroom.dto.response.MyRoomResponse;
import com.flolink.backend.domain.myroom.entity.MyRoom;

public interface MyRoomService {
	MyRoom createMyRoom();

	MyRoomResponse getMyRoom(Integer userId);

	MyRoomResponse equipItem(Integer userId, HasItemRequest itemId);

	MyRoomResponse unequipItem(Integer userId, HasItemRequest itemId);
}
