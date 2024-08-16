package com.flolink.backend.global.batch.plantwalk;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.batch.item.ItemReader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.flolink.backend.domain.plant.entity.Plant;
import com.flolink.backend.domain.plant.entity.plantwalk.PlantWalk;
import com.flolink.backend.domain.plant.repository.PlantRepository;
import com.flolink.backend.domain.plant.repository.PlantWalkRepository;

import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class PlantWalkReader implements ItemReader<PlantWalk> {

	@Autowired
	private PlantWalkRepository plantWalkRepository;

	private List<PlantWalk> plantWalks;
	private int nextPlantIndex;

	@Override
	public PlantWalk read() {
		log.info("============== Plant Walk Read START =============");
		if (plantWalks == null) {
			LocalDateTime expirationTime = LocalDateTime.now().minusHours(3);
			plantWalks = plantWalkRepository.findAllByWalkYnTrueAndUseYnTrueAndStartAtBefore(expirationTime);
			nextPlantIndex = 0;
		}

		PlantWalk nextPlant = null;

		if (nextPlantIndex < plantWalks.size()) {
			nextPlant = plantWalks.get(nextPlantIndex);
			nextPlantIndex++;
		}

		log.info("============== Plant Walk Read END =============");
		return nextPlant;
	}
}
