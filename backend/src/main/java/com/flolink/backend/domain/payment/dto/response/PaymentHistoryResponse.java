package com.flolink.backend.domain.payment.dto.response;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.flolink.backend.domain.payment.entity.PaymentHistory;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class PaymentHistoryResponse {
	private String orderName;
	private BigDecimal amount;
	private LocalDateTime paymentAt;
	private String method;

	public static PaymentHistoryResponse fromEntity(PaymentHistory paymentHistory) {
		return PaymentHistoryResponse.builder()
			.orderName(paymentHistory.getPaymentItem().getPoints() + " 포인트")
			.amount(paymentHistory.getPaymentItem().getPrice())
			.paymentAt(paymentHistory.getApprovedAt())
			.method(paymentHistory.getMethod())
			.build();
	}
}
