package com.flolink.backend.domain.myroom.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.flolink.backend.domain.myroom.dto.response.HasItemInfoResponse;
import com.flolink.backend.domain.myroom.entity.HasItem;
import com.flolink.backend.domain.myroom.repository.HasItemRepository;
import com.flolink.backend.domain.store.entity.Item;
import com.flolink.backend.domain.user.entity.User;
import com.flolink.backend.domain.user.repository.UserRepository;
import com.flolink.backend.global.common.ResponseCode;
import com.flolink.backend.global.common.exception.BadRequestException;
import com.flolink.backend.global.common.exception.NotFoundException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class HasItemServiceImpl implements HasItemService {

	private final HasItemRepository hasItemRepository;
	private final UserRepository userRepository;

	/**
	 * 인벤토리에 아이템을 저장 - 다른 서비스 (ItemService) 계층에서 호출
	 * @param user 사용자
	 * @param item 아이템
	 * @return 저장된 HasItem 엔티티
	 */
	@Override
	@Transactional
	public HasItem saveHasItem(final User user, final Item item) {
		if (hasItemRepository.existsByItem_itemId(item.getItemId())) {
			throw new BadRequestException(ResponseCode.ITEM_ALREADY_PURCHASE);
		}
		
		return hasItemRepository.save(HasItem.of(user.getMyRoom(), item));
	}

	/**
	 * 인벤토리에서 아이템을 조회 - 컨트롤러 Layer 에서 호출
	 * @param userId 유저 ID
	 * @return HasItemResponse 목록
	 */
	@Override
	@Transactional(readOnly = true)
	public List<HasItemInfoResponse> getHasItems(final Integer userId) {
		User user = userRepository.findById(userId)
			.orElseThrow(() -> new NotFoundException(ResponseCode.USER_NOT_FOUND));

		return hasItemRepository.findByMyRoom(user.getMyRoom())
			.stream()
			.map(HasItemInfoResponse::fromEntity)
			.toList();
	}
}
