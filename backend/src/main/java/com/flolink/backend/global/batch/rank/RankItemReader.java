package com.flolink.backend.global.batch.rank;

import java.util.List;

import org.springframework.batch.item.ItemReader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.flolink.backend.domain.plant.entity.Plant;
import com.flolink.backend.domain.plant.entity.plantexp.PlantUserExp;
import com.flolink.backend.domain.plant.repository.PlantUserExpRepository;

import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class RankItemReader implements ItemReader<PlantUserExp> {

	@Autowired
	private PlantUserExpRepository plantUserExpRepository;

	private List<PlantUserExp> userExpList;
	private int nextUserExpIndex;

	@Override
	public PlantUserExp read() {
		log.info("============== Plant User History Read START =============");
		if (userExpList == null) {
			userExpList = plantUserExpRepository.findAllGroupedByPlantOrderByContributeExpAsc();
			nextUserExpIndex = 0;
		}

		PlantUserExp nextPlantUserExp = null;

		if (nextUserExpIndex < userExpList.size()) {
			nextPlantUserExp = userExpList.get(nextUserExpIndex);
			nextUserExpIndex++;
		}

		// if (nextPlantUserExp != null && nextPlantUserExp.getPlant().getTotalExp() == 0) {
		// 	log.info("============== Plant User History Read (return null) END =============");
		// 	return null;
		// }

		log.info("============== Plant User History Read END =============");
		return nextPlantUserExp;
	}
}
