package com.flolink.backend.global.batch.rank;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;

import org.springframework.batch.item.ItemProcessor;
import org.springframework.stereotype.Component;

import com.flolink.backend.domain.plant.entity.Plant;
import com.flolink.backend.domain.plant.entity.UserExp;
import com.flolink.backend.domain.plant.entity.UserExpHistory;

@Component
public class RankItemProcessor implements ItemProcessor<UserExp, UserExpHistory> {

	private DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM");
	private Map<Plant, Integer> plantRanks = new HashMap<>();

	@Override
	public UserExpHistory process(UserExp userExp) throws Exception {
		Plant plant = userExp.getPlant();
		int monthly_rank = plantRanks.getOrDefault(plant, 1);

		UserExpHistory userExpHistory = UserExpHistory.builder()
			.plant(userExp.getPlant())
			.dateMonth(LocalDate.now().minusMonths(1).format(formatter))
			.monthlyRank(monthly_rank)
			.userId(userExp.getUserId())
			.contributeExp(userExp.getContributeExp())
			.build();

		userExp.setContributeExp(0);

		plantRanks.put(plant, monthly_rank + 1);

		return userExpHistory;
	}
}

