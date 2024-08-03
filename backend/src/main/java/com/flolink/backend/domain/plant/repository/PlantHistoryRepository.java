package com.flolink.backend.domain.plant.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.flolink.backend.domain.plant.entity.Plant;
import com.flolink.backend.domain.plant.entity.PlantExpHistory;

public interface PlantHistoryRepository extends JpaRepository<PlantExpHistory, Integer> {

	@Query("SELECT h FROM PlantExpHistory h WHERE h.plant = :plant AND FUNCTION('YEAR', h.dateMonth) = :year")
	List<PlantExpHistory> findByPlantIdAndYear(Plant plant, Integer year);

}
