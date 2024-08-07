package com.flolink.backend.domain.plant.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.flolink.backend.domain.myroom.entity.MyRoom;
import com.flolink.backend.domain.plant.entity.Plant;
import com.flolink.backend.domain.plant.entity.UserExp;

public interface UserExpRepository extends JpaRepository<UserExp, Integer> {

	@Query("SELECT u FROM UserExp u ORDER BY u.plant.plantId, u.contributeExp DESC")
	List<UserExp> findAllGroupedByPlantOrderByContributeExpAsc();

	Optional<UserExp> findByUserIdAndPlant(Integer userId, Plant plant);

	@Query("SELECT COUNT(u) > 0 FROM UserExp u WHERE u.plant.plantId = :plantId AND u.userId = :userId")
	boolean existsByPlantIdAndUserId(@Param("userId") Integer userId, @Param("plantId") Integer plantId);

}
