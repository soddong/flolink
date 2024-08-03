package com.flolink.backend.domain.plant.dto.response;

import java.time.LocalDate;

import com.flolink.backend.domain.plant.entity.PlantExpHistory;
import com.flolink.backend.global.util.ExpUtil;

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
	private LocalDate dateMonth;
	private Integer level;

	public static PlantHistoryResponse fromEntity(PlantExpHistory plantExpHistory, int memberSize) {
		return PlantHistoryResponse.builder()
			.plantHistoryId(plantExpHistory.getPlantHistoryId())
			.dateMonth(plantExpHistory.getDateMonth())
			.level(ExpUtil.calculateLevel(plantExpHistory.getTotalExp(), memberSize))
			.build();
	}
}
