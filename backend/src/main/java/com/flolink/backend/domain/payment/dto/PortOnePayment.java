package com.flolink.backend.domain.payment.dto;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PortOnePayment {
	private String paymentKey;
	private String orderId;
	private String code;
}
