package com.flolink.backend.domain.store.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.flolink.backend.domain.store.entity.Item;

public interface ItemRepository extends JpaRepository<Item, Integer> {
}
