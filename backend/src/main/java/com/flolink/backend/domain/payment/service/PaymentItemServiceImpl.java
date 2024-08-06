package com.flolink.backend.domain.payment.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.flolink.backend.domain.payment.dto.response.PaymentItemResponse;
import com.flolink.backend.domain.payment.entity.PaymentItem;
import com.flolink.backend.domain.payment.repository.PaymentItemRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class PaymentItemServiceImpl implements PaymentItemService {

	private final PaymentItemRepository paymentItemRepository;

	public List<PaymentItemResponse> getAllPaymentItems() {
		return paymentItemRepository.findAll().stream()
				.map(PaymentItemResponse::fromEntity)
				.toList();
	}
}
