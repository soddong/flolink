package com.flolink.backend.global.batch.plant;

import java.util.List;

import org.springframework.batch.item.ItemReader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.flolink.backend.domain.plant.entity.Plant;
import com.flolink.backend.domain.plant.repository.PlantRepository;

@Component
public class PlantItemReader implements ItemReader<Plant> {

	@Autowired
	private PlantRepository plantRepository;

	private List<Plant> plants;
	private int nextPlantIndex;

	@Override
	public Plant read() {
		if (plants == null) {
			plants = plantRepository.findAll();
			nextPlantIndex = 0;
		}

		Plant nextPlant = null;

		if (nextPlantIndex < plants.size()) {
			nextPlant = plants.get(nextPlantIndex);
			nextPlantIndex++;
		}

		return nextPlant;
	}
}
