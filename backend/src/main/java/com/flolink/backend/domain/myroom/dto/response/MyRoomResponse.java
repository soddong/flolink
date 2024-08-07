package com.flolink.backend.domain.myroom.dto.response;

import java.util.List;

import com.flolink.backend.domain.myroom.entity.MyRoom;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class MyRoomResponse {
	private Integer myRoomId;
	private List<HasItemInfoResponse> hasItemInfos;

	public static MyRoomResponse fromEntity(MyRoom myRoom, List<HasItemInfoResponse> hasItemInfos) {
		return MyRoomResponse.builder()
			.myRoomId(myRoom.getMyRoomId())
			.hasItemInfos(hasItemInfos)
			.build();
	}
}
