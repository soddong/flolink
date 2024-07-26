package com.flolink.backend.domain.item.controller;

import static com.flolink.backend.global.common.ResponseCode.*;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.flolink.backend.domain.item.dto.request.ItemRequest;
import com.flolink.backend.domain.item.dto.response.ItemPurchaseResponse;
import com.flolink.backend.domain.item.dto.response.ItemResponse;
import com.flolink.backend.domain.item.service.ItemService;
import com.flolink.backend.global.common.CommonResponse;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/items")
@RequiredArgsConstructor
@Tag(name = "Item API", description = "아이템과 관련된 API")
public class ItemController {

	private final ItemService itemService;

	@GetMapping
	@Operation(summary = "아이템 전체 조회하기")
	public ResponseEntity<CommonResponse> getAllItems() {
		log.info("===아이템 전체 조회 START===");
		List<ItemResponse> items = itemService.getAllItems();
		log.info("===아이템 전체 조회 END===");
		return ResponseEntity.ok(CommonResponse.of(COMMON_SUCCESS, items));
	}

	@GetMapping("/{itemId}")
	@Operation(summary = "아이템 상세 조회하기")
	public ResponseEntity<CommonResponse> getItemById(@PathVariable final Integer itemId) {
		log.info("===아이템 상세 조회 START===");
		ItemResponse item = itemService.getItemById(itemId);
		log.info("===아이템 상세 조회 END===");
		return ResponseEntity.ok(CommonResponse.of(COMMON_SUCCESS, item));
	}

	@PostMapping
	@Operation(summary = "아이템 생성하기")
	public ResponseEntity<CommonResponse> saveItem(@RequestBody final ItemRequest itemRequest) {
		log.info("===아이템 생성 START===");
		ItemResponse savedItem = itemService.saveItem(itemRequest.toEntity());
		log.info("===아이템 생성 END===");
		return ResponseEntity.ok(CommonResponse.of(COMMON_SUCCESS, savedItem));
	}

	@DeleteMapping("/{itemId}")
	@Operation(summary = "아이템 삭제하기")
	public ResponseEntity<CommonResponse> deleteItem(@PathVariable final Integer itemId) {
		log.info("===아이템 삭제 START===");
		itemService.deleteItem(itemId);
		log.info("===아이템 삭제 END===");
		return ResponseEntity.ok(CommonResponse.of(COMMON_SUCCESS, null));
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
	public ResponseEntity<CommonResponse> getPurchaseLogs() {
		log.info("===아이템 구매내역 조회 START===");
		Integer userId = 1;
		List<ItemPurchaseResponse> purchaseResponses = itemService.getPurchaseLogs(userId);
		log.info("===아이템 구매내역 조회 END===");
		return ResponseEntity.ok(CommonResponse.of(COMMON_SUCCESS, purchaseResponses));
	}

}
