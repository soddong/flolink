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
import com.flolink.backend.domain.item.dto.response.ItemResponse;
import com.flolink.backend.domain.item.service.ItemService;
import com.flolink.backend.global.common.CommonResponse;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/item")
@RequiredArgsConstructor
@Tag(name = "item-controller", description = "실제 사용될 API - 전체조회, 상세조회")
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
	public ResponseEntity<CommonResponse> getItemById(@PathVariable int itemId) {
		log.info("===아이템 상세 조회 START===");
		ItemResponse item = itemService.getItemById(itemId);
		log.info("===아이템 상세 조회 END===");
		return ResponseEntity.ok(CommonResponse.of(COMMON_SUCCESS, item));
	}

	@PostMapping
	@Operation(summary = "아이템 생성하기")
	public ResponseEntity<CommonResponse> saveItem(@RequestBody ItemRequest itemRequest) {
		log.info("===아이템 생성 START===");
		ItemResponse savedItem = itemService.saveItem(itemRequest.toEntity());
		log.info("===아이템 생성 END===");
		return ResponseEntity.ok(CommonResponse.of(COMMON_SUCCESS, savedItem));
	}

	@DeleteMapping("/{itemId}")
	@Operation(summary = "아이템 삭제하기")
	public ResponseEntity<CommonResponse> deleteItem(@PathVariable int itemId) {
		log.info("===아이템 삭제 START===");
		itemService.deleteItem(itemId);
		log.info("===아이템 삭제 END===");
		return ResponseEntity.ok(CommonResponse.of(COMMON_SUCCESS, null));
	}

}
