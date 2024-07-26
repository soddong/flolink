package com.flolink.backend.domain.room.dto.request;

import com.flolink.backend.domain.room.entity.Room;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class RoomUpdateRequest {

	private Integer roomId;
	private String roomName;

	public Room toEntity() {
		return Room.builder()
			.roomId(roomId)
			.roomName(roomName)

			.build();
	}
}
