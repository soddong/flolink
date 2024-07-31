package com.flolink.backend.domain.plant.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.flolink.backend.domain.plant.entity.MonthlyRank;
import com.flolink.backend.domain.plant.entity.Plant;
import com.flolink.backend.domain.room.entity.UserRoom;

public interface MonthlyRankRepository extends JpaRepository<MonthlyRank, Integer> {
	Optional<MonthlyRank> findMonthlyRankByUserRoomAndPlant(UserRoom userRoom, Plant plant);
}
