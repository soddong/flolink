package com.flolink.backend.domain.payment.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.flolink.backend.domain.payment.entity.PaymentItem;

@Repository
public interface PaymentItemRepository extends JpaRepository<PaymentItem, Long> {
}
