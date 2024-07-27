package com.flolink.backend.domain.payment.dto.response;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.flolink.backend.domain.payment.entity.Payment;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class PaymentResponse {
	private String orderName;
	private BigDecimal amount;
	private LocalDateTime paymentAt;
	private String method;

	public static PaymentResponse fromEntity(Payment payment) {
		return PaymentResponse.builder()
			.orderName(payment.getOrderName())
			.amount(payment.getAmount())
			.paymentAt(payment.getApprovedAt())
			.method(payment.getMethod())
			.build();
	}
}
