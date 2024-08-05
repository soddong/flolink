package com.flolink.backend.domain.payment.service;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.stereotype.Service;

import com.flolink.backend.domain.payment.dto.PortOnePayment;
import com.flolink.backend.domain.payment.dto.request.PaymentCreateRequest;
import com.flolink.backend.domain.payment.dto.response.PaymentHistoryResponse;
import com.flolink.backend.domain.payment.dto.response.PaymentPrepareResponse;
import com.flolink.backend.domain.payment.entity.PaymentHistory;
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
	public PaymentPrepareResponse preparePayment(final Integer userId, final PaymentCreateRequest request) {
		User user = userRepository.findById(userId)
			.orElseThrow(() -> new NotFoundException(ResponseCode.USER_NOT_FOUND));

		PaymentHistory savedPaymentHistory = paymentRepository.save(
			PaymentHistory.createPayment(user, request)
		);

		return PaymentPrepareResponse.fromEntity(savedPaymentHistory);
	}

	@Override
	@Transactional
	public void completePayment(final PortOnePayment portOne) {
		PaymentHistory paymentHistory = paymentRepository.findByOrderId(portOne.getOrderId())
			.orElseThrow(() -> new NotFoundException(ResponseCode.PAYMENT_NOT_FOUND));

		BigDecimal amount = new BigDecimal(portOne.getTotalAmount());
		String status = portOne.getStatus();

		if (paymentHistory.getAmount().compareTo(amount) != 0) {
			paymentHistory.failPayment();
			paymentRepository.save(paymentHistory);
			throw new BadRequestException(ResponseCode.PAYMENT_AMOUNT_MISMATCH);
		}

		if (!"DONE".equals(status)) {
			paymentHistory.failPayment();
			paymentRepository.save(paymentHistory);
			throw new BadRequestException(ResponseCode.PAYMENT_BANK_FAILED);
		}

		paymentHistory.completePayment(portOne);
	}

	@Override
	@Transactional
	public List<PaymentHistoryResponse> getPaymentHistory(Integer userId) {
		List<PaymentHistory> paymentHistories = paymentRepository.findByStateAndUserUserId(PaymentState.PAID, userId);
		return paymentHistories.stream()
			.map(PaymentHistoryResponse::fromEntity)
			.toList();
	}

}
