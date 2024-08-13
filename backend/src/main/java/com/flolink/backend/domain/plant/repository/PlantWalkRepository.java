package com.flolink.backend.domain.plant.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.flolink.backend.domain.plant.entity.plantwalk.PlantWalk;

public interface PlantWalkRepository extends JpaRepository<PlantWalk, Integer> {

	Optional<PlantWalk> findByPlantPlantIdAndUseYnTrue(Integer plantId);

	Optional<PlantWalk> findByPlantPlantId(Integer plantId);

	List<PlantWalk> findAllByWalkYnTrueAndUseYnTrueAndStartAtBefore(LocalDateTime expirationTime);

}
