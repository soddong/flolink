package com.flolink.backend.domain.payment.service;

import java.util.List;

import com.flolink.backend.domain.payment.dto.PortOnePayment;
import com.flolink.backend.domain.payment.dto.request.PaymentRequest;
import com.flolink.backend.domain.payment.dto.response.PaymentCreateResponse;
import com.flolink.backend.domain.payment.dto.response.PaymentResponse;

public interface PaymentService {

	PaymentCreateResponse preparePayment(Integer userId, PaymentRequest request);

	void completePayment(PortOnePayment portOne);

	List<PaymentResponse> getPaymentHistory();
}
