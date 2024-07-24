package com.flolink.backend.domain.room.dto.response;

import com.flolink.backend.domain.room.entity.Nickname;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class RoomUserNickNameResponse {

	private Integer nicknameId;
	private Integer targetUserRoomId;
	private String targetNickname;

	public static RoomUserNickNameResponse fromEntity(Nickname nickName) {
		return RoomUserNickNameResponse.builder()
			.nicknameId(nickName.getNicknameId())
			.targetUserRoomId(nickName.getTargetUserRoomId())
			.targetNickname(nickName.getTargetNickname())
			.build();

	}
}
