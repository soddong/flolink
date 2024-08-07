package com.flolink.backend.domain.myroom.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class MyRoomDetailRequest {
	private Integer userRoomId;
}
