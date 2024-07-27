package com.flolink.backend.domain.payment.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.flolink.backend.domain.payment.entity.Payment;
import com.flolink.backend.domain.payment.entity.PaymentState;

public interface PaymentRepository extends JpaRepository<Payment, Integer> {
	Optional<Payment> findByOrderId(String orderId);

	List<Payment> findByState(PaymentState state);
}
