package com.flolink.backend.domain.plant.dto.response;

import java.util.List;

import com.flolink.backend.domain.feed.dto.response.FeedImageResponse;

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
public class PlantHistoryDetailResponse {
	// 피드이미지 랜덤 10개
	private List<FeedImageResponse> feedImageResponses;
	// 유저별 랭킹
	private List<PlantUserHistoryResponse> plantUserHistoryRespons;

	public static PlantHistoryDetailResponse fromEntity(List<FeedImageResponse> feedImageResponses,
		List<PlantUserHistoryResponse> plantUserHistoryRespons) {
		return PlantHistoryDetailResponse.builder()
			.feedImageResponses(feedImageResponses)
			.plantUserHistoryRespons(plantUserHistoryRespons)
			.build();
	}

}
