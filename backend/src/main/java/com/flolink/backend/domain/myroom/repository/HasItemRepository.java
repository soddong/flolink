package com.flolink.backend.domain.myroom.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.flolink.backend.domain.myroom.entity.HasItem;
import com.flolink.backend.domain.myroom.entity.MyRoom;

public interface HasItemRepository extends JpaRepository<HasItem, Integer> {
	List<HasItem> findByMyRoom(MyRoom myRoom);

	boolean existsByItem_itemId(Integer itemId);
}
