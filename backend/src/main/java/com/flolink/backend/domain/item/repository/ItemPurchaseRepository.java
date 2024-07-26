package com.flolink.backend.domain.item.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.flolink.backend.domain.item.entity.ItemPurchase;

public interface ItemPurchaseRepository extends JpaRepository<ItemPurchase, Integer> {
}
