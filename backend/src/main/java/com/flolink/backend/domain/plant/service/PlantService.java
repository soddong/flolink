package com.flolink.backend.domain.plant.service;

import com.flolink.backend.domain.plant.dto.reqeust.PlantLocation;
import com.flolink.backend.domain.plant.dto.response.PlantSummaryResponse;
import com.flolink.backend.domain.plant.dto.response.PlantWalkResultResponse;
import com.flolink.backend.domain.plant.entity.enumtype.ActivityPointType;
import com.flolink.backend.domain.plant.entity.Plant;
import com.flolink.backend.domain.room.entity.Room;
import com.flolink.backend.domain.room.entity.UserRoom;

public interface PlantService {

	Plant createPlant(UserRoom userRoom, Room room);

	// void updateExp(UserRoom userRoom, ActivityPointType type);

	PlantSummaryResponse getPlantInfo(Integer roomId);

	Plant findById(Integer plantId);

	Plant findByRoomId(Integer roomId);

	void savePlantUserExp(Integer userId, Plant createdPlant);

	void startWalk(Integer plantId, PlantLocation plantLocation);

	PlantWalkResultResponse completeWalk(Integer userId, Integer plantId, PlantLocation plantLocation);

	PlantLocation getStartWalkLocation(Integer plantId);
}
