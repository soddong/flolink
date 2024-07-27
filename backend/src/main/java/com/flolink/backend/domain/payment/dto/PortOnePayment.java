package com.flolink.backend.domain.payment.dto;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PortOnePayment {
	private String paymentKey;

	private String orderId;

	private String orderName;

	private Integer totalAmount;

	private String status;

	private LocalDateTime approvedAt;

	private String currency;

	private String method;

	private Receipt receipt;

	@Getter
	@Setter
	public static class Receipt {
		private String url;
	}
}
