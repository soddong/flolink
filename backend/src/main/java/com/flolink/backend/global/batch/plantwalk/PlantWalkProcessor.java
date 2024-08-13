package com.flolink.backend.global.batch.plantwalk;

import java.time.LocalDate;

import org.springframework.batch.item.ItemProcessor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Component;

import com.flolink.backend.domain.plant.entity.Plant;
import com.flolink.backend.domain.plant.entity.enumtype.PlantStatusType;
import com.flolink.backend.domain.plant.entity.plantexp.PlantExpHistory;
import com.flolink.backend.domain.plant.entity.plantwalk.PlantWalk;
import com.flolink.backend.domain.plant.service.plantwalk.PlantWalkService;

import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class PlantWalkProcessor implements ItemProcessor<PlantWalk, PlantWalk> {

	@Autowired
	private PlantWalkService plantWalkService;

	@Override
	public PlantWalk process(PlantWalk plantWalk) {
		log.info("============== Plant Walk Process START =============");
		plantWalkService.endPlantWalk(plantWalk);
		log.info("============== Plant Walk Process END =============");
		return plantWalk;
	}
}
