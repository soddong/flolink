package com.flolink.backend.domain.plant.service;

import com.flolink.backend.domain.plant.dto.response.PlantHistorySummaryResponse;

public interface PlantHistoryService {

	PlantHistorySummaryResponse getPlantHistorys(Integer plantId, Integer year);

}
