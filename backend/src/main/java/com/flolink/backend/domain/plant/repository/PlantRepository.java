package com.flolink.backend.domain.plant.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.flolink.backend.domain.plant.entity.Plant;

public interface PlantRepository extends JpaRepository<Plant, Integer> {

	Optional<Plant> findByRoomRoomId(Integer roomId);

}
