package com.flolink.backend.domain.myroom.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.flolink.backend.domain.myroom.entity.HasItem;
import com.flolink.backend.domain.myroom.entity.MyRoom;

public interface HasItemRepository extends JpaRepository<HasItem, Integer> {
	List<HasItem> findByMyRoom(MyRoom myRoom);

	@Query("SELECT COUNT(h) > 0 FROM HasItem h WHERE h.item.itemId = :itemId AND h.myRoom = :myRoom AND h.useYn = true")
	boolean existsByItemItemIdAndMyRoom(Integer itemId, MyRoom myRoom);
}
