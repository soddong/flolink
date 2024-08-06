package com.flolink.backend.domain.payment.service;

import java.util.List;

import com.flolink.backend.domain.payment.dto.response.PaymentItemResponse;
import com.flolink.backend.domain.payment.entity.PaymentItem;

public interface PaymentItemService {
	List<PaymentItemResponse> getAllPaymentItems();
}
