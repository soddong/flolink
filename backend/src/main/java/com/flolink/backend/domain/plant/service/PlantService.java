package com.flolink.backend.domain.plant.service;

import com.flolink.backend.domain.plant.dto.response.PlantSummaryResponse;
import com.flolink.backend.domain.plant.entity.ActivityPoint;
import com.flolink.backend.domain.plant.entity.Plant;
import com.flolink.backend.domain.room.entity.Room;
import com.flolink.backend.domain.room.entity.UserRoom;

public interface PlantService {

	Plant createPlant(UserRoom userRoom, Room room);

	void updateExp(UserRoom userRoom, ActivityPoint type);

	PlantSummaryResponse getPlantInfo(Integer roomId);

}
