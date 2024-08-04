package com.flolink.backend.domain.room.dto.response;

import com.flolink.backend.domain.room.entity.Nickname;
import com.flolink.backend.domain.room.entity.UserRoom;

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
	private String profile;
	private String emotion;
	private String message;
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
			.message(userRoom.getMessage().getContent())
			.emotion("good") // message entity 추가하면서 끌고오기
			.targetUserRoomId(userRoom.getUserRoomId())
			.targetNickname(userRoom.getUser().getNickname())
			.build();
	}
}
