package com.flolink.backend.domain.plant.service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

import org.springframework.stereotype.Service;

import com.flolink.backend.domain.plant.dto.reqeust.PlantLocation;
import com.flolink.backend.domain.plant.dto.response.PlantWalkResultResponse;
import com.flolink.backend.domain.plant.entity.ActivityPoint;
import com.flolink.backend.domain.plant.entity.Plant;
import com.flolink.backend.domain.plant.entity.PlantWalk;
import com.flolink.backend.domain.plant.repository.PlantWalkRepository;
import com.flolink.backend.domain.room.entity.UserRoom;
import com.flolink.backend.domain.room.service.RoomService;
import com.flolink.backend.domain.user.service.UserService;
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

	private final UserService userService;
	private final RoomService roomService;
	private final PlantWalkRepository plantWalkRepository;
	private final PlantService plantService;

	@Transactional
	public PlantWalk savePlantWalk(Plant plant) {
		return plantWalkRepository.save(PlantWalk.createPlantWalk(plant));
	}

	@Transactional
	public void startWalk(Integer plantId, PlantLocation plantLocation) {
		PlantWalk plantWalk = findPlantWalkById(plantId);
		validateStartWalk(plantWalk, plantLocation);

		Plant plant = plantService.findById(plantId);
		plant.updateWalk(plantLocation.getUserRoomId());

		plantWalk.startPlantWalk(plantLocation);
	}

	@Transactional
	public PlantWalkResultResponse completeWalk(Integer plantId, PlantLocation plantLocation) {
		PlantWalk plantWalk = findActivePlantWalk(plantId);
		validateCompleteWalk(plantWalk, plantLocation);

		double distance = calculateDistance(plantWalk.getStartLat(), plantWalk.getStartLng(), plantLocation.getLat(), plantLocation.getLng());
		double speed = calculateSpeed(plantWalk.getStartAt(), LocalDateTime.now(), distance);

		PlantWalkResultResponse plantWalkResultResponse = PlantWalkResultResponse.of(distance, speed);

		endPlantWalk(plantWalk);

		if (meetsDistanceRequirementForPoints(distance) && meetsSpeedRequirementForPoints(speed)) {
			awardPoints(plantWalk);
		}

		return plantWalkResultResponse;
	}

	@Transactional
	public PlantLocation getStartWalkLocation(Integer plantId) {
		PlantWalk plantWalk = findActivePlantWalk(plantId);
		return PlantLocation.fromEntity(plantWalk);
	}

	private PlantWalk findPlantWalkById(Integer plantId) {
		return plantWalkRepository.findByPlantPlantId(plantId)
			.orElseThrow(() -> new NotFoundException(ResponseCode.PLANT_WALK_NOT_FOUND));
	}

	private PlantWalk findActivePlantWalk(Integer plantId) {
		return plantWalkRepository.findByPlantPlantIdAndWalkYnTrue(plantId)
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

		double earthRadius = 6371; // Kilometers
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

	private void awardPoints(PlantWalk plantWalk) {
		UserRoom userRoom = roomService.findUserRoomByUserRoomId(plantWalk.getUserRoomId());
		plantService.updateExp(userRoom, ActivityPoint.WALK);
	}

	private void endPlantWalk(PlantWalk plantWalk) {
		Plant plant = plantService.findById(plantWalk.getPlant().getPlantId());
		plant.updateWalk(0);
		plantWalk.endPlantWalk();
	}
}
