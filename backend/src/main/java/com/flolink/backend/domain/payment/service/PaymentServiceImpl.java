package com.flolink.backend.domain.payment.service;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.stereotype.Service;

import com.flolink.backend.domain.payment.dto.PortOnePayment;
import com.flolink.backend.domain.payment.dto.request.PaymentRequest;
import com.flolink.backend.domain.payment.dto.response.PaymentCreateResponse;
import com.flolink.backend.domain.payment.dto.response.PaymentResponse;
import com.flolink.backend.domain.payment.entity.Payment;
import com.flolink.backend.domain.payment.entity.PaymentState;
import com.flolink.backend.domain.payment.repository.PaymentRepository;
import com.flolink.backend.domain.user.entity.User;
import com.flolink.backend.domain.user.repository.UserRepository;
import com.flolink.backend.global.common.ResponseCode;
import com.flolink.backend.global.common.exception.BadRequestException;
import com.flolink.backend.global.common.exception.NotFoundException;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

	private final PaymentRepository paymentRepository;
	private final UserRepository userRepository;

	@Override
	@Transactional
	public PaymentCreateResponse preparePayment(final Integer userId, final PaymentRequest request) {
		User user = userRepository.findById(userId)
			.orElseThrow(() -> new NotFoundException(ResponseCode.USER_NOT_FOUND));

		Payment savedPayment = paymentRepository.save(
			Payment.createPayment(user, request)
		);

		return PaymentCreateResponse.fromEntity(savedPayment);
	}

	@Override
	@Transactional
	public void completePayment(final PortOnePayment portOne) {
		Payment payment = paymentRepository.findByOrderId(portOne.getOrderId())
			.orElseThrow(() -> new NotFoundException(ResponseCode.PAYMENT_NOT_FOUND));

		BigDecimal amount = new BigDecimal(portOne.getTotalAmount());
		String status = portOne.getStatus();

		if (payment.getAmount().compareTo(amount) != 0) {
			payment.failPayment();
			paymentRepository.save(payment);
			throw new BadRequestException(ResponseCode.PAYMENT_AMOUNT_MISMATCH);
		}

		if (!"DONE".equals(status)) {
			payment.failPayment();
			paymentRepository.save(payment);
			throw new BadRequestException(ResponseCode.PAYMENT_BANK_FAILED);
		}

		payment.completePayment(portOne);
	}

	@Override
	@Transactional
	public List<PaymentResponse> getPaymentHistory() {
		List<Payment> payments = paymentRepository.findByState(PaymentState.PAID);
		return payments.stream()
			.map(PaymentResponse::fromEntity)
			.toList();
	}

}
