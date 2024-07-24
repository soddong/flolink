package com.flolink.backend.domain.room.dto.request;

import java.time.LocalDateTime;

import com.flolink.backend.domain.room.entity.Room;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class RoomCreateRequest {

	private String roomName;

	public Room toEntity() {
		return Room.builder()
			.roomName(roomName)
			.createAt(LocalDateTime.now())
			.useYn(true)
			.build();
	}
}
