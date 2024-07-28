package com.flolink.backend.domain.payment.dto.response;

import java.math.BigDecimal;

import com.flolink.backend.domain.payment.entity.Payment;
import com.flolink.backend.domain.payment.entity.PaymentState;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class PaymentPrepareResponse {
	private String orderId;
	private String orderName;
	private BigDecimal amount;
	private PaymentState state;

	public static PaymentPrepareResponse fromEntity(Payment payment) {
		return PaymentPrepareResponse.builder()
			.orderId(payment.getOrderId())
			.orderName(payment.getOrderName())
			.amount(payment.getAmount())
			.state(payment.getState())
			.build();
	}
}
