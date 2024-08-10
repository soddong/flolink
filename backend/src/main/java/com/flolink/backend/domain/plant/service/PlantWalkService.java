package com.flolink.backend.domain.plant.service;

import java.util.Map;

import com.flolink.backend.domain.plant.dto.reqeust.PlantLocation;
import com.flolink.backend.domain.plant.dto.response.PlantWalkResultResponse;
import com.flolink.backend.domain.plant.entity.Plant;
import com.flolink.backend.domain.plant.entity.PlantWalk;

public interface PlantWalkService {

	PlantWalk savePlantWalk(Plant plant);

	void startWalk(Integer plantId, PlantLocation plantLocation);

	PlantWalkResultResponse completeWalk(Integer plantId, PlantLocation plantLocation);

	PlantLocation getStartWalkLocation(Integer plantId);
}
