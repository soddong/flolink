package com.flolink.backend.domain.room.service;

import java.util.List;

import com.flolink.backend.domain.room.dto.request.RoomCreateRequest;
import com.flolink.backend.domain.room.dto.request.RoomUpdateRequest;
import com.flolink.backend.domain.room.dto.response.RoomSummarizeResponse;
import com.flolink.backend.domain.room.dto.response.RoomUserNickNameResponse;

public interface RoomService {

	List<RoomSummarizeResponse> getAllRooms(final Integer userId);

	RoomSummarizeResponse createRoom(final Integer userId, final RoomCreateRequest roomCreateRequest);

	RoomSummarizeResponse registerRoom(final Integer userId, final Integer roomId);

	List<RoomUserNickNameResponse> getRoomUserNickNames(final Integer userId, final Integer roomId);

	RoomSummarizeResponse updateRoomDetail(final Integer userId, final RoomUpdateRequest roomUpdateRequest);

}