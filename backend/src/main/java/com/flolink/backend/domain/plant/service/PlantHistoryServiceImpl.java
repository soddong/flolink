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

	/**
	 * 특정 식물의 연도별 히스토리 리스트 조회
	 * @param plantId 식물 ID
	 * @param year 연도
	 * @return 식물 히스토리 리스트
	 */
	@Override
	public PlantHistorySummaryResponse getPlantHistorys(Integer plantId, Integer year) {
		Plant plant = loadPlant(plantId);
		int memberSize = getMemberSize(plant);

		List<PlantExpHistory> histories = loadPlantHistories(plant, year);
		List<PlantHistoryResponse> historyResponses = mapHistoriesToResponses(histories, memberSize);
		long achievementCount = calculateAchievementCount(histories);

		return PlantHistorySummaryResponse.fromEntity(historyResponses, achievementCount);
	}

	private Plant loadPlant(Integer plantId) {
		return plantRepository.findById(plantId)
			.orElseThrow(() -> new NotFoundException(ResponseCode.PLANT_NOT_FOUND));
	}
	
	private int getMemberSize(Plant plant) {
		return plant.getRoom().getUserRoomList().size();
	}

	private List<PlantExpHistory> loadPlantHistories(Plant plant, Integer year) {
		return plantHistoryRepository.findByPlantIdAndYear(plant, year);
	}

	private List<PlantHistoryResponse> mapHistoriesToResponses(List<PlantExpHistory> histories, int memberSize) {
		return histories.stream()
			.map(response -> PlantHistoryResponse.fromEntity(response, memberSize))
			.toList();
	}

	private long calculateAchievementCount(List<PlantExpHistory> histories) {
		return histories.stream()
			.filter(history -> history.getPlantStatus().equals(PlantStatus.COMPLETED))
			.count();
	}
}
