package com.flolink.backend.domain.observer.listener;

import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

import com.flolink.backend.domain.observer.event.ExpUpdateEvent;
import com.flolink.backend.domain.plant.entity.Plant;
import com.flolink.backend.domain.plant.entity.plantexp.PlantUserExp;
import com.flolink.backend.domain.plant.service.PlantService;
import com.flolink.backend.domain.plant.service.plantexp.PlantExpUserService;

@Component
public class UserExpListener implements ApplicationListener<ExpUpdateEvent> {

	private final PlantExpUserService plantExpUserService;
	private final PlantService plantService;

	public UserExpListener(PlantExpUserService plantExpUserService, PlantService plantService) {
		this.plantExpUserService = plantExpUserService;
		this.plantService = plantService;
	}

	@Override
	public void onApplicationEvent(ExpUpdateEvent event) {
		Plant plant = plantService.findByRoomId(event.getRoomId());
		System.out.println("점수획득 " + event.getType().getPoint());
		PlantUserExp plantUserExp = plantExpUserService.findPlantUserExp(event.getUserId(), plant.getPlantId());
		plantUserExp.increaseExpOfUser(event.getType().getPoint());
	}
}
