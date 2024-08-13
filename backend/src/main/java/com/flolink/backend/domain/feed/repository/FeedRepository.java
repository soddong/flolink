package com.flolink.backend.domain.feed.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.flolink.backend.domain.feed.entity.Feed;

@Repository
public interface FeedRepository extends JpaRepository<Feed, Integer> {

	@Query("select f from Feed f where f.createAt < :lastFeedDate and f.userRoom.room.roomId = :roomId order by f.createAt desc limit :size")
	List<Feed> findByDateLessThanOrderByCreateAtDesc(@Param("lastFeedDate") LocalDateTime lastFeedDate,
		@Param("roomId") Integer roomId,
		@Param("size") Integer size);

}
