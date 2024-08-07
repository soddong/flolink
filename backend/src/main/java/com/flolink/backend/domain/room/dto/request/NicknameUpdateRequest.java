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
	String target_nickname;
	Integer target_user_room_id;
	Integer user_room_id;
}
