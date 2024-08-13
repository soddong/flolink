package com.flolink.backend.global.batch.plant;

import java.util.List;

import org.springframework.batch.item.ItemReader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.flolink.backend.domain.plant.entity.Plant;
import com.flolink.backend.domain.plant.repository.PlantRepository;

import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class PlantItemReader implements ItemReader<Plant> {

	@Autowired
	private PlantRepository plantRepository;

	private List<Plant> plants;
	private int nextPlantIndex;

	@Override
	public Plant read() {
		log.info("============== Plant History Read START =============");
		if (plants == null) {
			plants = plantRepository.findAll();
			nextPlantIndex = 0;
		}

		Plant nextPlant = null;

		if (nextPlantIndex < plants.size()) {
			nextPlant = plants.get(nextPlantIndex);
			nextPlantIndex++;
		}

		// if (nextPlant != null && nextPlant.getTotalExp() == 0) {
		// 	log.info("============== Plant History Read (return null) END =============");
		// 	return null;
		// }

		log.info("============== Plant History Read END =============");
		return nextPlant;
	}
}
