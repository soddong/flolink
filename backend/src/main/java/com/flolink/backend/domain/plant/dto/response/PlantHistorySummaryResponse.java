package com.flolink.backend.domain.plant.dto.response;

import java.util.List;

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
public class PlantHistorySummaryResponse {
	// history_id와 피드개수, 달성률
	private List<PlantHistoryResponse> plantHistorys;
	private Integer totalCount;
	private Integer achievementCount;

	public static PlantHistorySummaryResponse fromEntity(
		List<PlantHistoryResponse> plantHistoryResponseList,
		long achievementCount

	) {
		return PlantHistorySummaryResponse.builder()
			.plantHistorys(plantHistoryResponseList)
			.totalCount(plantHistoryResponseList.size())
			.achievementCount((int)achievementCount)
			.build();
	}
}
