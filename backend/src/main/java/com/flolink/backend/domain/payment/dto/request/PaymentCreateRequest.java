package com.flolink.backend.domain.payment.dto.request;

import java.math.BigDecimal;

import com.flolink.backend.domain.payment.entity.PaymentItem;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PaymentCreateRequest {
	private Integer pointId;
}
