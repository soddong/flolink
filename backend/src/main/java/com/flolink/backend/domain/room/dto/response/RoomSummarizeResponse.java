package com.flolink.backend.domain.room.dto.response;

import com.flolink.backend.domain.room.entity.Room;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class RoomSummarizeResponse {
	private Integer roomId;
	private String roomName;
	private Integer userCount;
	private String roomParticipateCode;
	private String roomParticipatePassword;

	public static RoomSummarizeResponse fromEntity(Room room) {
		return RoomSummarizeResponse.builder()
			.roomId(room.getRoomId())
			.roomName(room.getRoomName())
			.userCount(room.getUserRoomList() == null ? 1 : room.getUserRoomList().size())
			.roomParticipatePassword(room.getRoomParticipatePassword())
			.build();
	}
}
