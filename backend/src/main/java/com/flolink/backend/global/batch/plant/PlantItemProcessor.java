package com.flolink.backend.global.batch.plant;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import org.springframework.batch.item.ItemProcessor;
import org.springframework.stereotype.Component;

import com.flolink.backend.domain.plant.entity.Plant;
import com.flolink.backend.domain.plant.entity.PlantExpHistory;
import com.flolink.backend.domain.plant.entity.PlantStatus;

@Component
public class PlantItemProcessor implements ItemProcessor<Plant, PlantExpHistory> {

	private DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM");

	@Override
	public PlantExpHistory process(Plant plant) {

		PlantExpHistory plantExpHistory = PlantExpHistory.builder()
			.plant(plant)
			.totalExp(plant.getTotalExp())
			.dateMonth(LocalDate.now().minusMonths(1).format(formatter))
			.build();

		plant.setTotalExp(0);
		plant.setTodayExp(0);
		plant.setPlantStatus(PlantStatus.IN_PROGRESS);

		return plantExpHistory;
	}
}
