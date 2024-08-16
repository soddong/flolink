package com.flolink.backend.domain.payment.entity;

import java.math.BigDecimal;

import com.flolink.backend.domain.payment.dto.request.PaymentCreateRequest;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "payment_item")
public class PaymentItem {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "point_id")
	private Integer pointId;

	@Column(name = "point_name", nullable = false)
	private String points;

	@Column(name = "price", nullable = false)
	private BigDecimal price;

	@Column(name = "image", nullable = false)
	private String image;
}
