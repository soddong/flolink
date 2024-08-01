package com.flolink.backend.domain.room.dto.response;

import java.util.List;

import com.flolink.backend.domain.plant.dto.response.PlantResponse;

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
public class RoomDetailResponse {
	private RoomSummarizeResponse roomSummarizeResponse;
	private List<RoomMemberInfoResponse> memberInfoResponses;
	private PlantResponse plantResponse;

	public static RoomDetailResponse of(List<RoomMemberInfoResponse> memberInfoResponses, PlantResponse plantResponse) {
		return RoomDetailResponse.builder()
			.memberInfoResponses(memberInfoResponses)
			.plantResponse(plantResponse)
			.build();
	}

	public static RoomDetailResponse of(RoomSummarizeResponse roomSummarizeResponse,
		List<RoomMemberInfoResponse> memberInfoResponses, PlantResponse plantResponse) {
		return RoomDetailResponse.builder()
			.memberInfoResponses(memberInfoResponses)
			.roomSummarizeResponse(roomSummarizeResponse)
			.plantResponse(plantResponse).build();

	}
}
