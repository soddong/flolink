package com.flolink.backend.domain.payment.entity;

import static com.flolink.backend.global.util.RandomUtil.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.flolink.backend.domain.payment.dto.PortOnePayment;
import com.flolink.backend.domain.payment.dto.request.PaymentRequest;
import com.flolink.backend.domain.user.entity.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
@Table(name = "payment_history")
public class Payment {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "payment_id")
	private int paymentId;

	@Column(name = "order_id", nullable = false)
	private String orderId;

	@ManyToOne
	@JoinColumn(name = "user_id", nullable = false)
	private User user;

	@Column(name = "payment_key")
	private String paymentKey;

	@Column(name = "order_name")
	private String orderName;

	@Column(name = "amount", nullable = false)
	private BigDecimal amount;

	@Enumerated(EnumType.STRING)
	@Column(name = "state", nullable = false)
	private PaymentState state;

	@Column(name = "approved_at")
	private LocalDateTime approvedAt;

	@Column(name = "currency")
	private String currency;

	@Column(name = "method")
	private String method;

	@Column(name = "receipt_url")
	private String receiptUrl;

	public static Payment createPayment(User user, PaymentRequest paymentRequest) {
		return Payment.builder()
			.user(user)
			.orderId(generateRandomUUID())
			.orderName(paymentRequest.getAmount().toString() + " 포인트")
			.amount(paymentRequest.getAmount())
			.state(PaymentState.PENDING)
			.currency("KRW")
			.build();
	}

	public void completePayment(PortOnePayment portOne) {
		this.paymentKey = portOne.getPaymentKey();
		this.currency = portOne.getCurrency();
		this.method = portOne.getMethod();
		this.receiptUrl = portOne.getReceipt().getUrl();
		this.approvedAt = portOne.getApprovedAt();
		this.state = PaymentState.PAID;
	}

	public void failPayment() {
		this.state = PaymentState.FAILED;
	}
}
