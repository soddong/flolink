package com.flolink.backend.domain.store.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.flolink.backend.domain.store.entity.ItemPurchaseHistory;

public interface ItemPurchaseRepository extends JpaRepository<ItemPurchaseHistory, Integer> {

	@Query("SELECT ip FROM ItemPurchaseHistory ip WHERE ip.user.userId = :userId ORDER BY ip.purchaseAt DESC")
	List<ItemPurchaseHistory> findByUserIdOrderByPurchaseAtDesc(@Param("userId") Integer userId);

}
