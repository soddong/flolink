package com.flolink.backend.domain.plant.service;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import com.flolink.backend.domain.plant.dto.response.PlantResponse;
import com.flolink.backend.domain.plant.entity.ActivityType;
import com.flolink.backend.domain.plant.entity.MonthlyRank;
import com.flolink.backend.domain.plant.entity.Plant;
import com.flolink.backend.domain.plant.repository.MonthlyRankRepository;
import com.flolink.backend.domain.plant.repository.PlantRepository;
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
	private final MonthlyRankRepository rankRepository;

	/**
	 * 가족방 생성될때 애완식물 생성
	 *
	 * @param room 생성된 가족방
	 */
	@Override
	public void createPlant(UserRoom userRoom, Room room) {

		Plant plant = plantRepository.save(
			Plant.create(room)
		);

		rankRepository.save(
			MonthlyRank.of(userRoom, plant)
		);

	}

	/**
	 * @param userRoom userRoom 정보
	 * @param type 활동 타입 (산책, 출석, 피드, 게시글)
	 */
	@Override
	public void updateExp(UserRoom userRoom, ActivityType type) {
		Plant plant = plantRepository.findByRoomRoomId(userRoom.getRoom().getRoomId())
			.orElseThrow(() -> new NotFoundException(ResponseCode.PLANT_NOT_FOUND));

		// TODO planid와 userroomid 조합해서 rank가져오기
		MonthlyRank rank = rankRepository.findByPlantPlantId(plant.getPlantId())
			.orElseThrow(() -> new NotFoundException(ResponseCode.RANK_NOT_FOUND));

		// if 마지막 수정시간이 오늘이 아니면, 오늘 경험치 0으로 초기화
		if (isPlantUpdatedBeforeToday(plant.getUpdateAt())) {
			plant.initToday();
		}

		// if 경험치가 제한보다 크면, 예외처리
		int N = plant.getRoom().getUserRoomList().size();

		plant.increaseExp(type.getPoint(), N);
		rank.increaseExpOfUser(type.getPoint());
	}

	/**
	 *
	 * @param roomId 방 ID
	 * @return 식물 정보를 반환
	 */
	@Override
	public PlantResponse getPlantInfo(Integer roomId) {
		Plant plant = plantRepository.findByRoomRoomId(roomId)
			.orElseThrow(() -> new NotFoundException(ResponseCode.PLANT_NOT_FOUND));
		return PlantResponse.fromEntity(plant);
	}

	public boolean isPlantUpdatedBeforeToday(LocalDateTime plantUpdateAt) {
		LocalDate today = LocalDate.now();
		if (plantUpdateAt == null) { // 첫 가입시 null임
			return true;
		}
		LocalDate plantUpdateDate = plantUpdateAt.toLocalDate();
		return plantUpdateDate.isBefore(today);
	}
}
