package com.flolink.backend.domain.observer.listener;

import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

import com.flolink.backend.domain.observer.event.ExpUpdateEvent;
import com.flolink.backend.domain.plant.entity.Plant;
import com.flolink.backend.domain.plant.service.PlantService;
import com.flolink.backend.domain.plant.service.plantexp.PlantExpUserService;

import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class PlantExpListener implements ApplicationListener<ExpUpdateEvent> {
	private final PlantService plantService;

	public PlantExpListener(PlantService plantService) {
		this.plantService = plantService;
	}

	@Override
	public void onApplicationEvent(ExpUpdateEvent event) {
		Plant plant = plantService.findByRoomId(event.getRoomId());
		log.info("점수획득 " + event.getType().getPoint());
		plant.increaseExp(event.getType().getPoint(), plant.getRoom().getUserRoomList().size());
	}
}
