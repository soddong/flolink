package com.flolink.backend.domain.room.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class RoomUpdateRequest {

	private Integer roomId;
	private String roomName;
	private String roomParticipatePassword;
	private String notice;

}
