package com.flolink.backend.domain.plant.service;

import com.flolink.backend.domain.plant.dto.response.PlantResponse;
import com.flolink.backend.domain.plant.entity.ActivityType;
import com.flolink.backend.domain.room.entity.Room;
import com.flolink.backend.domain.room.entity.UserRoom;

public interface PlantService {

	void createPlant(UserRoom userRoom, Room room);

	void updateExp(UserRoom userRoom, ActivityType type);

	PlantResponse getPlantInfo(Integer roomId);
}
