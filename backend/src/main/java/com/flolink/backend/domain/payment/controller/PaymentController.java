package com.flolink.backend.domain.payment.controller;

import static com.flolink.backend.global.common.ResponseCode.*;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.flolink.backend.domain.payment.dto.PortOnePayment;
import com.flolink.backend.domain.payment.dto.request.PaymentCreateRequest;
import com.flolink.backend.domain.payment.dto.response.PaymentHistoryResponse;
import com.flolink.backend.domain.payment.dto.response.PaymentPrepareResponse;
import com.flolink.backend.domain.payment.service.PaymentService;
import com.flolink.backend.global.common.CommonResponse;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/payments")
@RequiredArgsConstructor
@Tag(name = "Payment API", description = "결제와 관련된 API")
public class PaymentController {

	private final PaymentService paymentService;

	@PostMapping("/prepare")
	@Operation(summary = "결제 시작")
	public ResponseEntity<CommonResponse> createPayment(@RequestBody final PaymentCreateRequest request) {
		Integer userId = 1;
		PaymentPrepareResponse response = paymentService.preparePayment(userId, request);
		return ResponseEntity.ok(CommonResponse.of(COMMON_SUCCESS, response));
	}

	@PostMapping("/complete")
	@Operation(summary = "결제 완료")
	public ResponseEntity<CommonResponse> completePayment(@RequestBody final PortOnePayment portOne) {
		paymentService.completePayment(portOne);
		return ResponseEntity.ok(CommonResponse.of(COMMON_SUCCESS));
	}

	@GetMapping("/history")
	@Operation(summary = "결제내역 조회")
	public ResponseEntity<CommonResponse> getPaymentHistory() {
		List<PaymentHistoryResponse> responses = paymentService.getPaymentHistory();
		return ResponseEntity.ok(CommonResponse.of(COMMON_SUCCESS, responses));
	}
}
