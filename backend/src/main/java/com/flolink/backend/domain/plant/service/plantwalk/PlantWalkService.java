package com.flolink.backend.domain.plant.service.plantwalk;

import com.flolink.backend.domain.plant.dto.reqeust.PlantLocation;
import com.flolink.backend.domain.plant.dto.response.PlantWalkResultResponse;
import com.flolink.backend.domain.plant.entity.Plant;
import com.flolink.backend.domain.plant.entity.plantwalk.PlantWalk;

public interface PlantWalkService {

	PlantWalk savePlantWalk(Plant plant);

	void startWalk(Plant plant, PlantLocation plantLocation);

	PlantWalkResultResponse completeWalk(Integer userId, Integer plantId, PlantLocation plantLocation);

	PlantLocation getStartWalkLocation(Integer plantId);

	void endPlantWalk(PlantWalk plantWalk);
}
