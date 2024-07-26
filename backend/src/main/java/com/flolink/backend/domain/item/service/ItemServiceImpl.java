package com.flolink.backend.domain.item.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.flolink.backend.domain.item.dto.response.ItemPurchaseResponse;
import com.flolink.backend.domain.item.dto.response.ItemResponse;
import com.flolink.backend.domain.item.entity.Item;
import com.flolink.backend.domain.item.entity.ItemPurchase;
import com.flolink.backend.domain.item.repository.ItemPurchaseRepository;
import com.flolink.backend.domain.item.repository.ItemRepository;
import com.flolink.backend.domain.user.entity.User;
import com.flolink.backend.domain.user.repository.UserRepository;
import com.flolink.backend.global.common.ResponseCode;
import com.flolink.backend.global.common.exception.BadRequestException;
import com.flolink.backend.global.common.exception.NotFoundException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class ItemServiceImpl implements ItemService {

	private final ItemRepository itemRepository;
	private final ItemPurchaseRepository itemPurchaseRepository;
	private final UserRepository userRepository;

	/**
	 * 아이템 저장
	 * @param item 저장할 아이템
	 */
	@Override
	@Transactional
	public ItemResponse saveItem(final Item item) {
		Item savedItem = itemRepository.save(item);
		return ItemResponse.fromEntity(savedItem);
	}

	/**
	 * 아이템 제거 (soft delete)
	 * @param itemId 제거할 아이템 ID
	 */
	@Override
	@Transactional
	public void deleteItem(final Integer itemId) {
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
	public ItemResponse getItemById(final Integer itemId) {
		Item item = itemRepository.findById(itemId)
			.orElseThrow(() -> new NotFoundException(ResponseCode.NOT_FOUND_ERROR));
		return ItemResponse.fromEntity(item);
	}

	/**
	 *
	 * @param userId 구매할 유저 ID
	 * @param itemId 구매할 아이템 ID
	 */
	@Override
	@Transactional
	public ItemPurchaseResponse purchaseItem(final Integer userId, final Integer itemId) {
		Item item = itemRepository.findById(itemId)
			.orElseThrow(() -> new NotFoundException(ResponseCode.ITEM_NOT_FOUND));

		User user = userRepository.findById(userId)
			.orElseThrow(() -> new NotFoundException(ResponseCode.USER_NOT_FOUND));

		// 포인트가 충분하지 않으면, 예외
		if ((user.getPoint()).compareTo(item.getPrice()) < 0) {
			throw new BadRequestException(ResponseCode.INSUFFICIENT_FUNDS);
		}

		processUserPurchase(user, item);                            // 사용자 포인트 업데이트
		ItemPurchase itemPurchase = savePurchaseLog(user, item);     // 구매 내역 저장
		// TODO: 인벤토리에 저장

		return ItemPurchaseResponse.fromEntity(itemPurchase);
	}

	/**
	 *
	 * @param userId 아이템주문 조회할 유저 ID
	 * @return 유저가 주문한 아이템 리스트
	 */
	@Override
	public List<ItemPurchaseResponse> getPurchaseLogs(final Integer userId) {
		return itemPurchaseRepository.findByUserIdOrderByPurchaseAtDesc(userId)
			.stream()
			.map(ItemPurchaseResponse::fromEntity)
			.toList();
	}

	@Override
	public void processUserPurchase(User user, Item item) {
		// TODO : User 엔티티에서 update 하도록 수정필요
		user.setPoint(user.getPoint().subtract(item.getPrice()));
	}

	@Override
	public ItemPurchase savePurchaseLog(User user, Item item) {
		return itemPurchaseRepository.save(ItemPurchase.of(user, item));
	}

}
