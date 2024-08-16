package com.flolink.backend.domain.feed.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.flolink.backend.domain.feed.entity.FeedImage;

@Repository
public interface FeedImageRepository extends JpaRepository<FeedImage, Integer> {

	@Query("SELECT fi FROM FeedImage fi "
		+ "JOIN fi.feed f "
		+ "JOIN f.userRoom ur "
		+ "WHERE ur.room.roomId =:roomId "
		+ "AND fi.createAt BETWEEN :startDate AND :endDate "
		+ "AND fi.useYn = true "
		+ "ORDER BY fi.createAt DESC"
	)
	List<FeedImage> findFeedImagesByUserIdAndRoomIdAndCreateAtBetween(
		@Param("roomId") Integer roomId,
		@Param("startDate") LocalDateTime startDate,
		@Param("endDate") LocalDateTime endDate
	);
}
