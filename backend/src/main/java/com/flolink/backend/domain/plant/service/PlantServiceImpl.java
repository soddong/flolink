package com.flolink.backend.domain.plant.service;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import com.flolink.backend.domain.plant.dto.response.PlantSummaryResponse;
import com.flolink.backend.domain.plant.entity.ActivityPoint;
import com.flolink.backend.domain.plant.entity.Plant;
import com.flolink.backend.domain.plant.entity.UserExp;
import com.flolink.backend.domain.plant.repository.PlantRepository;
import com.flolink.backend.domain.plant.repository.UserExpHistoryRepository;
import com.flolink.backend.domain.plant.repository.UserExpRepository;
import com.flolink.backend.domain.room.entity.Room;
import com.flolink.backend.domain.room.entity.UserRoom;
import com.flolink.backend.global.common.ResponseCode;
import com.flolink.backend.global.common.exception.NotFoundException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class PlantServiceImpl implements PlantService {

	private final PlantRepository plantRepository;
	private final UserExpRepository userExpRepository;
	private final UserExpHistoryRepository userExpHistoryRepository;

	/**
	 * 가족방 생성될때 애완식물 생성
	 * @param userRoom 처음 가족방 생성한 녀석
	 * @param room 생성된 가족방
	 */
	@Override
	public void createPlant(UserRoom userRoom, Room room) {
		Plant plant = plantRepository.save(Plant.create(room));
		userExpRepository.save(UserExp.of(userRoom.getUser().getUserId(), plant));
	}

	/**
	 * 사용자 활동에 따른 경험치 업데이트
	 * @param userRoom userRoom 정보
	 * @param type 활동 타입 (산책, 출석, 피드, 게시글)
	 */
	@Override
	public void updateExp(UserRoom userRoom, ActivityPoint type) {
		Plant plant = plantRepository.findByRoomRoomId(userRoom.getRoom().getRoomId())
			.orElseThrow(() -> new NotFoundException(ResponseCode.PLANT_NOT_FOUND));

		UserExp userExp = userExpRepository.findByUserIdAndPlant(userRoom.getUser().getUserId(), plant)
			.orElseThrow(() -> new NotFoundException(ResponseCode.USER_EXP_NOT_FOUND));

		if (isPlantUpdatedBeforeToday(plant.getUpdateAt())) {
			plant.initToday();
		}

		// 활동 타입에 따라 Plant와 UserExp 객체의 경험치를 증가
		plant.increaseExp(type.getPoint(), plant.getRoom().getUserRoomList().size());
		userExp.increaseExpOfUser(type.getPoint());
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
