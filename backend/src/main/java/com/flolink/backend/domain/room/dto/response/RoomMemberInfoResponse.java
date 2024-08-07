package com.flolink.backend.domain.room.dto.response;

import com.flolink.backend.domain.room.entity.Nickname;
import com.flolink.backend.domain.room.entity.UserRoom;
import com.flolink.backend.domain.user.entity.enumtype.ProfileType;

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
public class RoomMemberInfoResponse {

	private Integer userId;
	private Integer roomId;
	private ProfileType profile;
	private String emotion;
	private Integer targetUserRoomId;
	private String targetNickname;

	public static RoomMemberInfoResponse fromNicknameEntity(Nickname nickName) {
		return RoomMemberInfoResponse.builder()
			.targetUserRoomId(nickName.getTargetUserRoomId())
			.targetNickname(nickName.getTargetNickname())
			.build();
	}

	public static RoomMemberInfoResponse fromUserRoomEntity(UserRoom userRoom) {
		return RoomMemberInfoResponse.builder()
			.userId(userRoom.getUser().getUserId())
			.roomId(userRoom.getRoom().getRoomId())
			.profile(userRoom.getUser().getProfile())
			.targetUserRoomId(userRoom.getUserRoomId())
			.targetNickname(userRoom.getUser().getNickname())
			.build();
	}
}
