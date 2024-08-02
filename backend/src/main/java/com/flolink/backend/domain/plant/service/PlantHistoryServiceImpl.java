package com.flolink.backend.domain.plant.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.flolink.backend.domain.plant.dto.response.PlantHistoryResponse;
import com.flolink.backend.domain.plant.dto.response.PlantHistorySummaryResponse;
import com.flolink.backend.domain.plant.entity.Plant;
import com.flolink.backend.domain.plant.entity.PlantExpHistory;
import com.flolink.backend.domain.plant.entity.PlantStatus;
import com.flolink.backend.domain.plant.repository.PlantHistoryRepository;
import com.flolink.backend.domain.plant.repository.PlantRepository;
import com.flolink.backend.global.common.ResponseCode;
import com.flolink.backend.global.common.exception.NotFoundException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class PlantHistoryServiceImpl implements PlantHistoryService {

	private final PlantHistoryRepository plantHistoryRepository;

	private final PlantRepository plantRepository;

	@Override
	public PlantHistorySummaryResponse getPlantHistorys(Integer plantId, Integer year) {
		Plant plant = plantRepository.findById(plantId)
			.orElseThrow(() -> new NotFoundException(ResponseCode.PLANT_NOT_FOUND));

		int memberSize = plant.getRoom().getUserRoomList().size();

		// 히스토리 리스트
		List<PlantExpHistory> histories = plantHistoryRepository.findByPlantIdAndYear(plant, year);

		// 각 히스토리 맵핑
		List<PlantHistoryResponse> historyResponses = histories.stream()
			.map(response -> PlantHistoryResponse.fromEntity(response, memberSize))
			.toList();

		// 성취 카운트 계산
		long achievementCount = histories.stream()
			.filter(history -> history.getPlantStatus().equals(PlantStatus.COMPLETED))
			.count();

		return PlantHistorySummaryResponse.fromEntity(historyResponses, achievementCount);

	}
}
