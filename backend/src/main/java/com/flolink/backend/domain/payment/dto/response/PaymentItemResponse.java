package com.flolink.backend.domain.payment.dto.response;

import java.math.BigDecimal;

import com.flolink.backend.domain.payment.entity.PaymentHistory;
import com.flolink.backend.domain.payment.entity.PaymentItem;

import jakarta.persistence.Column;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class PaymentItemResponse {
	private Integer pointId;
	private String points;
	private BigDecimal price;
	private String image;

	public static PaymentItemResponse fromEntity(PaymentItem paymentItem) {
		return PaymentItemResponse.builder()
			.pointId(paymentItem.getPointId())
			.points(paymentItem.getPoints())
			.price(paymentItem.getPrice())
			.image(paymentItem.getImage())
			.build();
	}
}
