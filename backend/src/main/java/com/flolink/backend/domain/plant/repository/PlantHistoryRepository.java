package com.flolink.backend.domain.plant.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.flolink.backend.domain.plant.entity.PlantExpHistory;

public interface PlantHistoryRepository extends JpaRepository<PlantExpHistory, Integer> {
	
}
