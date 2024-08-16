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
	private String roomParticipatePassword;
	private String notice;

	public static RoomSummarizeResponse fromEntity(Room room) {
		return RoomSummarizeResponse.builder()
			.roomId(room.getRoomId())
			.roomName(room.getRoomName())
			.userCount(room.getUserRoomList() == null ? 1 : room.getUserRoomList().size())
			.roomParticipatePassword(room.getRoomParticipatePassword())
			.notice(room.getNotice() == null ? "" : room.getNotice())
			.build();
	}
}
