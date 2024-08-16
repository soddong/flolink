package com.flolink.backend.domain.plant.service.plantexp;

import com.flolink.backend.domain.plant.dto.response.PlantHistoryDetailResponse;
import com.flolink.backend.domain.plant.entity.plantexp.PlantUserExp;
import com.flolink.backend.global.common.ResponseCode;
import com.flolink.backend.global.common.exception.NotFoundException;

public interface PlantExpUserService {
	PlantHistoryDetailResponse getUserExpHistoryDetail(Integer plantId, Integer historyId);

	PlantUserExp findPlantUserExp(Integer userId, Integer plant);
}
