package com.flolink.backend.domain.myroom.service;

import com.flolink.backend.domain.myroom.dto.response.MyRoomResponse;
import com.flolink.backend.domain.myroom.entity.MyRoom;
import com.flolink.backend.domain.store.entity.ItemType;

public interface MyRoomService {
	MyRoom createMyRoom();

	MyRoomResponse getMyRoom(Integer userRoomIdToEnter);

	MyRoomResponse equipItem(Integer userId, Integer hasItemId);

	MyRoomResponse unequipItem(Integer userId, ItemType itemType);
}
