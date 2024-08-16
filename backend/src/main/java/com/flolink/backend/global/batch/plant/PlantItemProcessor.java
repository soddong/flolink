package com.flolink.backend.global.batch.plant;

import java.time.LocalDate;

import org.springframework.batch.item.ItemProcessor;
import org.springframework.stereotype.Component;

import com.flolink.backend.domain.plant.entity.Plant;
import com.flolink.backend.domain.plant.entity.plantexp.PlantExpHistory;
import com.flolink.backend.domain.plant.entity.enumtype.PlantStatusType;

import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class PlantItemProcessor implements ItemProcessor<Plant, PlantExpHistory> {

	@Override
	public PlantExpHistory process(Plant plant) {
		log.info("============== Plant History Writer START =============");
		PlantExpHistory plantExpHistory = PlantExpHistory.builder()
			.plant(plant)
			.plantStatusType(plant.getPlantStatusType())
			.totalExp(plant.getTotalExp())
			.dateMonth(LocalDate.now().minusMonths(1))
			.build();

		int exp = plant.getTotalExp();
		plant.setTotalExp(0);
		plant.setTodayExp(0);
		plant.setPlantStatusType(PlantStatusType.IN_PROGRESS);

		if (exp == 0) {
			log.info("============== Plant History Writer (return null) END =============");
			return null;
		}

		log.info("============== Plant History Writer END =============");
		return plantExpHistory;
	}
}
