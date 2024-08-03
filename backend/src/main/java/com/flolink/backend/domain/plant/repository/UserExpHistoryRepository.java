package com.flolink.backend.domain.plant.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.flolink.backend.domain.plant.entity.UserExpHistory;

public interface UserExpHistoryRepository extends JpaRepository<UserExpHistory, Integer> {

	@Query("SELECT u FROM UserExpHistory u WHERE u.plant.plantId = :plantId AND u.dateMonth = :dateMonth ORDER BY u.contributeExp DESC")
	List<UserExpHistory> findByPlantIdAndDateMonth(Integer plantId, String dateMonth);

}
