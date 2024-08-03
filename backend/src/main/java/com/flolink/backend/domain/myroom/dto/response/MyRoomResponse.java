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
	private Integer itemStand;
	private Integer itemRug;
	private Integer itemShelf;
	private Integer itemBed;
	private Integer itemBigtable;
	private Integer itemMinitable;
	private Integer itemVase;

	public static MyRoomResponse fromEntity(MyRoom myRoom) {
		return MyRoomResponse.builder()
			.myRoomId(myRoom.getMyRoomId())
			.itemStand(myRoom.getItemStand())
			.itemRug(myRoom.getItemRug())
			.itemShelf(myRoom.getItemShelf())
			.itemBed(myRoom.getItemBed())
			.itemBigtable(myRoom.getItemBigtable())
			.itemMinitable(myRoom.getItemMinitable())
			.itemVase(myRoom.getItemVase())
			.build();
	}
}
