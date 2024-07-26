package com.flolink.backend.domain.room.dto.request;

import java.time.LocalDateTime;

import com.flolink.backend.domain.room.entity.Room;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
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
