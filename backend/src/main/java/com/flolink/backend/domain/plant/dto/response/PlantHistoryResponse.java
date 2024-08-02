package com.flolink.backend.domain.plant.dto.response;

import com.flolink.backend.domain.plant.entity.PlantExpHistory;

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
public class PlantHistoryResponse {
	private Integer plantHistoryId;

	public static PlantHistoryResponse fromEntity(PlantExpHistory plantExpHistory) {
		return PlantHistoryResponse.builder()
			.plantHistoryId(plantExpHistory.getPlantHistoryId())
			.build();
	}
}
