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
	private String roomParticipatePassword;

	public Room toEntity() {
		return Room.builder()
			.roomName(roomName)
			.createAt(LocalDateTime.now())
			.roomParticipatePassword(roomParticipatePassword == null ? "000000" : roomParticipatePassword)
			.useYn(true)
			.build();
	}
}
