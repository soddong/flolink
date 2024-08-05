package com.flolink.backend.domain.payment.dto.request;

import java.math.BigDecimal;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PaymentCreateRequest {
	private String orderName;
	private BigDecimal amount;
}
