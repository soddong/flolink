package com.flolink.backend.domain.myroom.dto.response;

import com.flolink.backend.domain.myroom.entity.MyRoom;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class MyRoomResponse {
	private Integer myRoomId;
	private Integer userId;
	private Integer itemTable;
	private Integer itemChair;
	private Integer itemPot;
	private Integer itemPhotoFrame;

	public static MyRoomResponse fromEntity(MyRoom myRoom) {
		return MyRoomResponse.builder()
			.myRoomId(myRoom.getMyRoomId())
			// .userId(myRoom.getUser().getUserId()) // TODO
			.itemTable(myRoom.getItemTable())
			.itemChair(myRoom.getItemChair())
			.itemPot(myRoom.getItemPot())
			.itemPhotoFrame(myRoom.getItemPhotoFrame())
			.build();
	}
}
