package com.flolink.backend.domain.plant.service;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import com.flolink.backend.domain.plant.dto.reqeust.PlantLocation;
import com.flolink.backend.domain.plant.dto.response.PlantSummaryResponse;
import com.flolink.backend.domain.plant.dto.response.PlantWalkResultResponse;
import com.flolink.backend.domain.plant.entity.enumtype.ActivityPointType;
import com.flolink.backend.domain.plant.entity.Plant;
import com.flolink.backend.domain.plant.entity.plantexp.PlantUserExp;
import com.flolink.backend.domain.plant.repository.PlantRepository;
import com.flolink.backend.domain.plant.repository.PlantUserExpRepository;
import com.flolink.backend.domain.plant.service.plantexp.PlantExpUserService;
import com.flolink.backend.domain.plant.service.plantwalk.PlantWalkService;
import com.flolink.backend.domain.room.entity.Room;
import com.flolink.backend.domain.room.entity.UserRoom;
import com.flolink.backend.global.common.ResponseCode;
import com.flolink.backend.global.common.exception.NotFoundException;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class PlantServiceImpl implements PlantService {

	private final PlantWalkService plantWalkService;
	private final PlantRepository plantRepository;
	private final PlantUserExpRepository plantUserExpRepository;

	/**
	 * 가족방 생성될때 애완식물 생성
	 * @param userRoom 처음 가족방 생성한 녀석
	 * @param room 생성된 가족방
	 */
	@Override
	public Plant createPlant(UserRoom userRoom, Room room) {
		Plant createdPlant = plantRepository.save(Plant.create(room));

		plantWalkService.savePlantWalk(createdPlant);
		savePlantUserExp(userRoom.getUser().getUserId(), createdPlant);
		return createdPlant;
	}

	@Override
	public Plant findById(Integer plantId) {
		return plantRepository.findById(plantId)
			.orElseThrow(() -> new NotFoundException(ResponseCode.PLANT_NOT_FOUND));
	}

	@Override
	public void savePlantUserExp(Integer userId, Plant plant) {
		plantUserExpRepository.save(PlantUserExp.of(userId, plant));
	}

	/**
	 * 방 ID로 식물 정보 조회
	 * @param roomId 방 ID
	 * @return 식물 정보
	 */
	@Override
	public PlantSummaryResponse getPlantInfo(Integer roomId) {
		Plant plant = plantRepository.findByRoomRoomId(roomId)
			.orElseThrow(() -> new NotFoundException(ResponseCode.PLANT_NOT_FOUND));
		return PlantSummaryResponse.fromEntity(plant);
	}

	/**
	 * 방 ID로 식물 정보 조회
	 * @param roomId 방 ID
	 * @return 식물 정보
	 */
	@Override
	public Plant findByRoomId(Integer roomId) {
		return plantRepository.findByRoomRoomId(roomId)
			.orElseThrow(() -> new NotFoundException(ResponseCode.PLANT_NOT_FOUND));
	}


	@Override
	public void startWalk(Integer plantId, PlantLocation plantLocation) {
		plantWalkService.startWalk(findById(plantId), plantLocation);
	}

	@Override
	public PlantWalkResultResponse completeWalk(Integer userId, Integer plantId, PlantLocation plantLocation) {
		return plantWalkService.completeWalk(userId, plantId, plantLocation);
	}

	@Override
	public PlantLocation getStartWalkLocation(Integer plantId) {
		return plantWalkService.getStartWalkLocation(plantId);
	}


	/**
	 * Plant의 마지막 업데이트 날짜가 오늘 이전인지 확인
	 * @param plantUpdateAt Plant의 마지막 업데이트 날짜
	 * @return 오늘 이전이면 true, 아니면 false
	 */
	private boolean isPlantUpdatedBeforeToday(LocalDateTime plantUpdateAt) {
		LocalDate today = LocalDate.now();
		if (plantUpdateAt == null) { // 첫 가입시 null임
			return true;
		}
		LocalDate plantUpdateDate = plantUpdateAt.toLocalDate();
		return plantUpdateDate.isBefore(today);
	}
}
