package com.flolink.backend.domain.plant.dto.response;

import com.flolink.backend.domain.plant.entity.Plant;
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
public class PlantSummaryResponse {
	// LEVEL - exp/40
	// 현재 LEVEL 에서의 경험치 - exp%40
	private Integer plantId;
	private Integer nowLevel;
	private Integer nowExp;

	public static PlantSummaryResponse fromEntity(Plant plant) {
		return PlantSummaryResponse.builder()
			.plantId(plant.getPlantId())
			.nowLevel(ExpUtil.calculateLevel(plant.getTotalExp()
				, plant.getRoom().getUserRoomList().size()))
			.nowExp(ExpUtil.calculateNowExp(plant.getTotalExp()
				, plant.getRoom().getUserRoomList().size()))
			.build();
	}
}
