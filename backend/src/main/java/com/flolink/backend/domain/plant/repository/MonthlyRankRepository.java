package com.flolink.backend.domain.plant.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.flolink.backend.domain.plant.entity.MonthlyRank;

public interface MonthlyRankRepository extends JpaRepository<MonthlyRank, Integer> {
	Optional<MonthlyRank> findByPlantPlantId(Integer plantId);

}
