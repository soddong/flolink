package com.flolink.backend.domain.plant.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.flolink.backend.domain.plant.entity.Plant;
import com.flolink.backend.domain.plant.entity.UserExp;

public interface UserExpRepository extends JpaRepository<UserExp, Integer> {

	@Query("SELECT u FROM UserExp u ORDER BY u.plant, u.contributeExp DESC")
	List<UserExp> findAllGroupedByPlantOrderByContributeExpAsc();

	Optional<UserExp> findByUserIdAndPlant(Integer userId, Plant plant);
}
