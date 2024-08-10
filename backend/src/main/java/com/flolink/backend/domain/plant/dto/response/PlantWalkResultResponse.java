package com.flolink.backend.domain.plant.dto.response;

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
public class PlantWalkResultResponse {
	private Double distance;
	private Double speed;

	public static PlantWalkResultResponse of(Double distance, Double speed) {
		return PlantWalkResultResponse.builder()
			.distance(distance)
			.speed(speed)
			.build();
	}
}
