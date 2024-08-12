package com.flolink.backend.domain.plant.service.plantexp;

import com.flolink.backend.domain.plant.dto.response.PlantHistorySummaryResponse;

public interface PlantExpHistoryService {

	PlantHistorySummaryResponse getPlantHistorys(Integer plantId, Integer year);

}
