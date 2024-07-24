package com.flolink.backend.domain.item.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.flolink.backend.domain.item.dto.response.ItemResponse;
import com.flolink.backend.domain.item.entity.Item;
import com.flolink.backend.domain.item.repository.ItemRepository;
import com.flolink.backend.global.common.ResponseCode;
import com.flolink.backend.global.common.exception.NotFoundException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class ItemServiceImpl implements ItemService {

	private final ItemRepository itemRepository;

	/**
	 * 아이템 저장
	 * @param item 저장할 아이템
	 */
	@Override
	@Transactional
	public ItemResponse saveItem(Item item) {
		Item savedItem = itemRepository.save(item);
		return ItemResponse.fromEntity(savedItem);
	}

	/**
	 * 아이템 제거 (soft delete)
	 * @param itemId 제거할 아이템 ID
	 */
	@Override
	@Transactional
	public void deleteItem(int itemId) {
		Item item = itemRepository.findById(itemId)
			.orElseThrow(() -> new NotFoundException(ResponseCode.NOT_FOUND_ERROR));
		item.setUseYn(false);
	}

	/**
	 * 아이템 목록 조회
	 * @return 모든 아이템 목록
	 */
	@Override
	@Transactional(readOnly = true)
	public List<ItemResponse> getAllItems() {
		return itemRepository.findAll()
			.stream()
			.map(ItemResponse::fromEntity)
			.toList();
	}

	/**
	 * 아이템 상세 보기
	 * @param itemId 조회할 아이템의 ID
	 * @return 선택한 아이템의 상세 정보
	 */
	@Override
	@Transactional(readOnly = true)
	public ItemResponse getItemById(int itemId) {
		Item item = itemRepository.findById(itemId)
			.orElseThrow(() -> new NotFoundException(ResponseCode.NOT_FOUND_ERROR));
		return ItemResponse.fromEntity(item);
	}
}
