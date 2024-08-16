package com.flolink.backend.global.batch.rank;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;

import org.springframework.batch.item.ItemProcessor;
import org.springframework.stereotype.Component;

import com.flolink.backend.domain.plant.entity.Plant;
import com.flolink.backend.domain.plant.entity.plantexp.PlantUserExp;
import com.flolink.backend.domain.plant.entity.plantexp.PlantUserExpHistory;

import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class RankItemProcessor implements ItemProcessor<PlantUserExp, PlantUserExpHistory> {

	private DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM");
	private Map<Plant, Integer> plantRanks = new HashMap<>();

	@Override
	public PlantUserExpHistory process(PlantUserExp plantUserExp) throws Exception {
		log.info("============== Plant User History Processor START =============");
		Plant plant = plantUserExp.getPlant();
		int monthly_rank = plantRanks.getOrDefault(plant, 1);

		PlantUserExpHistory plantUserExpHistory = PlantUserExpHistory.builder()
			.plant(plantUserExp.getPlant())
			.dateMonth(LocalDate.now().minusMonths(1).format(formatter))
			.monthlyRank(monthly_rank)
			.userId(plantUserExp.getUserId())
			.contributeExp(plantUserExp.getContributeExp())
			.build();

		plantUserExp.setContributeExp(0);

		plantRanks.put(plant, monthly_rank + 1);

		log.info("============== Plant User History Processor END =============");
		return plantUserExpHistory;
	}
}

