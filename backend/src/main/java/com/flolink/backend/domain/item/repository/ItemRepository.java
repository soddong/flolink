package com.flolink.backend.domain.item.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.flolink.backend.domain.item.entity.Item;

public interface ItemRepository extends JpaRepository<Item, Integer> {
}
