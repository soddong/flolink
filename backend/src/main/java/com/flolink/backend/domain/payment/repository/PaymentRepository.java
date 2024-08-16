package com.flolink.backend.domain.payment.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.flolink.backend.domain.payment.entity.PaymentHistory;
import com.flolink.backend.domain.payment.entity.PaymentState;

public interface PaymentRepository extends JpaRepository<PaymentHistory, Integer> {
	Optional<PaymentHistory> findByOrderId(String orderId);

	List<PaymentHistory> findByStateAndUserUserId(PaymentState paymentState, Integer userId);
}
