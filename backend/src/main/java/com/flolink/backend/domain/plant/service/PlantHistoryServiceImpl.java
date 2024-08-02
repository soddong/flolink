package com.flolink.backend.domain.plant.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.flolink.backend.domain.plant.dto.response.PlantHistoryResponse;
import com.flolink.backend.domain.plant.dto.response.PlantHistorySummaryResponse;
import com.flolink.backend.domain.plant.entity.PlantExpHistory;
import com.flolink.backend.domain.plant.entity.PlantStatus;
import com.flolink.backend.domain.plant.repository.PlantHistoryRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class PlantHistoryServiceImpl implements PlantHistoryService {

	private final PlantHistoryRepository plantHistoryRepository;

	@Override
	public PlantHistorySummaryResponse getPlantHistorys(Integer plantId, Integer year) {

		List<PlantExpHistory> histories = plantHistoryRepository.findByPlantIdAndYear(plantId, year);

		List<PlantHistoryResponse> historyResponses = histories.stream()
			.map(PlantHistoryResponse::fromEntity)
			.toList();

		long achievementCount = histories.stream()
			.filter(history -> history.getPlantStatus().equals(PlantStatus.COMPLETED))
			.count();

		System.out.println(achievementCount);

		return PlantHistorySummaryResponse.fromEntity(historyResponses, achievementCount);

	}
}
