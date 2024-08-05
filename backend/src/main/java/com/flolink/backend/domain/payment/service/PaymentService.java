package com.flolink.backend.domain.payment.service;

import java.util.List;

import com.flolink.backend.domain.payment.dto.PortOnePayment;
import com.flolink.backend.domain.payment.dto.request.PaymentCreateRequest;
import com.flolink.backend.domain.payment.dto.response.PaymentHistoryResponse;
import com.flolink.backend.domain.payment.dto.response.PaymentPrepareResponse;

public interface PaymentService {

	PaymentPrepareResponse preparePayment(Integer userId, PaymentCreateRequest request);

	void completePayment(PortOnePayment portOne);

	List<PaymentHistoryResponse> getPaymentHistory(Integer userId);
}
