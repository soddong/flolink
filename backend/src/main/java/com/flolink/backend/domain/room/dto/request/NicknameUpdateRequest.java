package com.flolink.backend.domain.room.dto.request;

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
public class NicknameUpdateRequest {
	Integer roomId;
	String targetNickname;
	Integer targetUserRoomId;
}
