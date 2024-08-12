package com.flolink.backend.domain.payment.service;

import static com.flolink.backend.domain.payment.entity.PaymentState.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.flolink.backend.domain.payment.dto.PortOnePayment;
import com.flolink.backend.domain.payment.dto.request.PaymentCreateRequest;
import com.flolink.backend.domain.payment.dto.response.PaymentHistoryResponse;
import com.flolink.backend.domain.payment.dto.response.PaymentPrepareResponse;
import com.flolink.backend.domain.payment.entity.PaymentHistory;
import com.flolink.backend.domain.payment.entity.PaymentItem;
import com.flolink.backend.domain.payment.entity.PaymentState;
import com.flolink.backend.domain.payment.repository.PaymentItemRepository;
import com.flolink.backend.domain.payment.repository.PaymentRepository;
import com.flolink.backend.domain.user.entity.User;
import com.flolink.backend.domain.user.repository.UserRepository;
import com.flolink.backend.domain.user.service.UserService;
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

	private final UserService userService;

	private final PaymentItemRepository paymentItemRepository;
	private final PaymentRepository paymentRepository;
	private final UserRepository userRepository;

	@Override
	@Transactional
	public PaymentPrepareResponse preparePayment(final Integer userId, final Map<String, Long> request) {
		User user = userRepository.findById(userId)
			.orElseThrow(() -> new NotFoundException(ResponseCode.USER_NOT_FOUND));

		PaymentItem paymentItem = paymentItemRepository.findById(request.get("pointId"))
			.orElseThrow(() -> new NotFoundException(ResponseCode.PAYMENT_NOT_FOUND));

		PaymentHistory savedPaymentHistory = paymentRepository.save(
			PaymentHistory.createPayment(user, paymentItem)
		);

		return PaymentPrepareResponse.fromEntity(savedPaymentHistory);
	}

	@Override
	@Transactional
	public void completePayment(final Integer userId, final PortOnePayment portOne) {
		PaymentHistory paymentHistory = paymentRepository.findByOrderId(portOne.getOrderId())
			.orElseThrow(() -> new NotFoundException(ResponseCode.PAYMENT_NOT_FOUND));

		if (paymentHistory.getState() == PAID) {
			throw new BadRequestException(ResponseCode.PAYMENT_ALREADY_PAID);
		}

		userService.purchasePoint(userId, paymentHistory.getPaymentItem().getPrice());
		paymentHistory.completePayment(portOne);
	}

	@Override
	@Transactional
	public List<PaymentHistoryResponse> getPaymentHistory(Integer userId) {
		List<PaymentHistory> paymentHistories = paymentRepository.findByStateAndUserUserId(PAID, userId);
		return paymentHistories.stream()
			.map(PaymentHistoryResponse::fromEntity)
			.toList();
	}

}
