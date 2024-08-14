package com.flolink.backend.domain.plant.service.plantwalk;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Objects;

import org.springframework.stereotype.Service;

import com.flolink.backend.domain.observer.service.ActivityService;
import com.flolink.backend.domain.plant.dto.reqeust.PlantLocation;
import com.flolink.backend.domain.plant.dto.response.PlantWalkResultResponse;
import com.flolink.backend.domain.plant.entity.Plant;
import com.flolink.backend.domain.plant.entity.enumtype.ActivityPointType;
import com.flolink.backend.domain.plant.entity.plantwalk.PlantWalk;
import com.flolink.backend.domain.plant.repository.PlantWalkRepository;
import com.flolink.backend.global.common.ResponseCode;
import com.flolink.backend.global.common.exception.BadRequestException;
import com.flolink.backend.global.common.exception.NotFoundException;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class PlantWalkServiceImpl implements PlantWalkService {

	private final ActivityService activityService;

	private final PlantWalkRepository plantWalkRepository;

	@Transactional
	public PlantWalk savePlantWalk(Plant plant) {
		return plantWalkRepository.save(PlantWalk.createPlantWalk(plant));
	}

	@Transactional
	public void startWalk(Plant plant, PlantLocation plantLocation) {
		PlantWalk plantWalk = findActivePlantWalk(plant.getPlantId());
		validateStartWalk(plantWalk, plantLocation);

		plant.updateWalk(plantLocation.getUserRoomId());

		plantWalk.startPlantWalk(plantLocation);
	}

	@Transactional
	public PlantWalkResultResponse completeWalk(Integer userId, Integer plantId, PlantLocation plantLocation) {
		PlantWalk plantWalk = findActivePlantWalk(plantId);
		validateCompleteWalk(plantWalk, plantLocation);

		double distance = calculateDistance(plantWalk.getStartLat(), plantWalk.getStartLng(), plantLocation.getLat(),
			plantLocation.getLng());
		double speed = calculateSpeed(plantWalk.getStartAt(), LocalDateTime.now(), distance);

		PlantWalkResultResponse plantWalkResultResponse = PlantWalkResultResponse.of(distance, speed);

		endPlantWalk(plantWalk);

		if (meetsDistanceRequirementForPoints(distance) && meetsSpeedRequirementForPoints(speed)) {
			increaseExpAboutActivity(ActivityPointType.WALK,
				plantWalk.getPlant().getRoom().getRoomId(), plantWalk.getUserRoomId(), userId
			);
		}

		return plantWalkResultResponse;
	}

	@Transactional
	public PlantLocation getStartWalkLocation(Integer plantId) {
		PlantWalk plantWalk = findActivePlantWalk(plantId);
		return PlantLocation.fromEntity(plantWalk);
	}

	private PlantWalk findActivePlantWalk(Integer plantId) {
		return plantWalkRepository.findByPlantPlantIdAndUseYnTrue(plantId)
			.orElseThrow(() -> new NotFoundException(ResponseCode.PLANT_WALK_NOT_FOUND));
	}

	private void validateStartWalk(PlantWalk plantWalk, PlantLocation plantLocation) {
		if (plantWalk.getWalkYn() && !Objects.equals(plantWalk.getUserRoomId(), plantLocation.getUserRoomId())) {
			throw new BadRequestException(ResponseCode.PLANT_NOT_WALKING);
		} else if (plantWalk.getWalkYn()) {
			throw new BadRequestException(ResponseCode.PLANT_IS_WALKING_BY_OTHER);
		}
	}

	private void validateCompleteWalk(PlantWalk plantWalk, PlantLocation plantLocation) {
		if (!plantWalk.getWalkYn()) {
			throw new BadRequestException(ResponseCode.PLANT_NOT_WALKING);
		} else if (!Objects.equals(plantWalk.getUserRoomId(), plantLocation.getUserRoomId())) {
			throw new BadRequestException(ResponseCode.PLANT_IS_WALKING_BY_OTHER);
		}
	}

	private double calculateDistance(double startLat, double startLng, double endLat, double endLng) {
		startLat = Math.toRadians(startLat);
		startLng = Math.toRadians(startLng);
		endLat = Math.toRadians(endLat);
		endLng = Math.toRadians(endLng);

		double earthRadius = 6371; // 지구 반지름
		return earthRadius * Math.acos(
			Math.sin(startLat) * Math.sin(endLat) +
				Math.cos(startLat) * Math.cos(endLat) * Math.cos(startLng - endLng)
		);
	}

	private double calculateSpeed(LocalDateTime startAt, LocalDateTime now, double distance) {
		long durationInSeconds = Duration.between(startAt, now).getSeconds();
		double walkTimeInHours = durationInSeconds / 3600.0;
		return distance / walkTimeInHours;
	}

	private boolean meetsSpeedRequirementForPoints(double speed) {
		return speed < 20.0;
	}

	private boolean meetsDistanceRequirementForPoints(double distance) {
		return distance >= 1.0;
	}

	private void endPlantWalk(PlantWalk plantWalk) {
		Plant plant = plantWalk.getPlant();
		plant.updateWalk(0);
		plantWalk.endPlantWalk();
	}

	private void increaseExpAboutActivity(ActivityPointType type, Integer roomId, Integer userRoomId, Integer userId) {
		activityService.performActivity(userId, roomId, userRoomId, type);
	}
}
