package com.flolink.backend.domain.plant.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.flolink.backend.domain.plant.entity.PlantWalk;

public interface PlantWalkRepository extends JpaRepository<PlantWalk, Integer> {
	Optional<PlantWalk> findByPlantPlantIdAndWalkYnTrue(Integer plantId);

	Optional<PlantWalk> findByPlantPlantId(Integer plantId);

}
