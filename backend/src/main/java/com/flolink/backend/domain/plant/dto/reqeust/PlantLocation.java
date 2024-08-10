package com.flolink.backend.domain.plant.dto.reqeust;

import com.flolink.backend.domain.plant.entity.PlantWalk;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PlantLocation {
	private double lat;
	private double lng;
	private Integer userRoomId;

	public static PlantLocation fromEntity(PlantWalk plantWalk) {
		return PlantLocation.builder()
			.lat(plantWalk.getStartLat())
			.lng(plantWalk.getStartLng())
			.build();
	}
}
