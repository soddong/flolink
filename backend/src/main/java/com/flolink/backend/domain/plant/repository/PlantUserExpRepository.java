package com.flolink.backend.domain.plant.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.flolink.backend.domain.plant.entity.Plant;
import com.flolink.backend.domain.plant.entity.plantexp.PlantUserExp;

public interface PlantUserExpRepository extends JpaRepository<PlantUserExp, Integer> {

	@Query("SELECT u FROM PlantUserExp u ORDER BY u.plant.plantId, u.contributeExp DESC")
	List<PlantUserExp> findAllGroupedByPlantOrderByContributeExpAsc();

	Optional<PlantUserExp> findByUserIdAndPlantPlantId(@Param("userId") Integer userId, @Param("plantId") Integer plantId);

	@Query("SELECT COUNT(u) > 0 FROM PlantUserExp u WHERE u.plant.plantId = :plantId AND u.userId = :userId")
	boolean existsByPlantIdAndUserId(@Param("userId") Integer userId, @Param("plantId") Integer plantId);

}
