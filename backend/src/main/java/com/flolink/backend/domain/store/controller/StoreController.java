package com.flolink.backend.domain.store.controller;

import static com.flolink.backend.global.common.ResponseCode.*;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.flolink.backend.domain.store.dto.response.ItemCommonResponse;
import com.flolink.backend.domain.store.dto.response.ItemPurchaseResponse;
import com.flolink.backend.domain.store.service.ItemService;
import com.flolink.backend.global.common.CommonResponse;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/store")
@RequiredArgsConstructor
@Tag(name = "Store API", description = "상점과 관련된 API")
public class StoreController {

	private final ItemService itemService;

	@GetMapping
	@Operation(summary = "상점내 아이템 전체 조회하기")
	public ResponseEntity<CommonResponse> getAllItems() {
		log.info("===아이템 전체 조회 START===");
		List<ItemCommonResponse> items = itemService.getAllItems();
		log.info("===아이템 전체 조회 END===");
		return ResponseEntity.ok(CommonResponse.of(COMMON_SUCCESS, items));
	}

	@GetMapping("/{itemId}")
	@Operation(summary = "상점내 아이템 상세 조회하기")
	public ResponseEntity<CommonResponse> getItemById(@PathVariable final Integer itemId) {
		log.info("===아이템 상세 조회 START===");
		ItemCommonResponse item = itemService.getItemById(itemId);
		log.info("===아이템 상세 조회 END===");
		return ResponseEntity.ok(CommonResponse.of(COMMON_SUCCESS, item));
	}

	@PostMapping("/{itemId}/purchase")
	@Operation(summary = "아이템 구매하기")
	public ResponseEntity<CommonResponse> purchaseItem(@PathVariable final Integer itemId) {
		log.info("===아이템 구매 START===");
		int userId = 1;
		ItemPurchaseResponse purchaseResponse = itemService.purchaseItem(userId, itemId);
		log.info("===아이템 구매 END===");
		return ResponseEntity.ok(CommonResponse.of(COMMON_SUCCESS, purchaseResponse));
	}

	@GetMapping("/purchase/history")
	@Operation(summary = "아이템 구매내역 조회")
	public ResponseEntity<CommonResponse> getPurchaseHistory() {
		log.info("===아이템 구매내역 조회 START===");
		Integer userId = 1;
		List<ItemPurchaseResponse> purchaseResponses = itemService.getPurchaseHistory(userId);
		log.info("===아이템 구매내역 조회 END===");
		return ResponseEntity.ok(CommonResponse.of(COMMON_SUCCESS, purchaseResponses));
	}
}
