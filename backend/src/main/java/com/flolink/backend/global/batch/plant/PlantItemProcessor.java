package com.flolink.backend.global.batch.plant;

import java.time.LocalDate;

import org.springframework.batch.item.ItemProcessor;
import org.springframework.stereotype.Component;

import com.flolink.backend.domain.plant.entity.Plant;
import com.flolink.backend.domain.plant.entity.plantexp.PlantExpHistory;
import com.flolink.backend.domain.plant.entity.enumtype.PlantStatusType;

@Component
public class PlantItemProcessor implements ItemProcessor<Plant, PlantExpHistory> {

	@Override
	public PlantExpHistory process(Plant plant) {

		PlantExpHistory plantExpHistory = PlantExpHistory.builder()
			.plant(plant)
			.plantStatusType(plant.getPlantStatusType())
			.totalExp(plant.getTotalExp())
			.dateMonth(LocalDate.now().minusMonths(1))
			.build();

		plant.setTotalExp(0);
		plant.setTodayExp(0);
		plant.setPlantStatusType(PlantStatusType.IN_PROGRESS);

		return plantExpHistory;
	}
}
