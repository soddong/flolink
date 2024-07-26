package com.flolink.backend.domain.item.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.flolink.backend.domain.item.entity.ItemPurchase;

public interface ItemPurchaseRepository extends JpaRepository<ItemPurchase, Integer> {

	@Query("SELECT ip FROM ItemPurchase ip WHERE ip.user.userId = :userId ORDER BY ip.purchaseAt DESC")
	List<ItemPurchase> findByUserIdOrderByPurchaseAtDesc(@Param("userId") Integer userId);

}
