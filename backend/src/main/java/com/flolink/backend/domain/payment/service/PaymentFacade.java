package com.flolink.backend.domain.payment.service;

import org.springframework.stereotype.Component;

import com.flolink.backend.domain.payment.dto.PortOnePayment;
import com.flolink.backend.global.aop.DistributedLock;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class PaymentFacade {

	private final PaymentServiceImpl paymentService;

	@DistributedLock(key = "#p1.getPaymentKey()")
	public void processPayment(final Integer userId, final PortOnePayment portOne) {
		paymentService.completePayment(userId, portOne);
	}
}
