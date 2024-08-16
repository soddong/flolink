package com.flolink.backend.domain.myroom.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.flolink.backend.domain.myroom.dto.response.HasItemInfoResponse;
import com.flolink.backend.domain.myroom.dto.response.MyRoomResponse;
import com.flolink.backend.domain.myroom.entity.HasItem;
import com.flolink.backend.domain.myroom.entity.MyRoom;
import com.flolink.backend.domain.myroom.repository.HasItemRepository;
import com.flolink.backend.domain.myroom.repository.MyRoomRepository;
import com.flolink.backend.domain.room.entity.UserRoom;
import com.flolink.backend.domain.room.repository.UserRoomRepository;
import com.flolink.backend.domain.store.entity.ItemType;
import com.flolink.backend.domain.user.entity.User;
import com.flolink.backend.domain.user.repository.UserRepository;
import com.flolink.backend.global.common.ResponseCode;
import com.flolink.backend.global.common.exception.NotFoundException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MyRoomServiceImpl implements MyRoomService {

	private final MyRoomRepository myRoomRepository;
	private final UserRepository userRepository;
	private final HasItemRepository hasItemRepository;
	private final UserRoomRepository userRoomRepository;

	/**
	 * 유저가 생성될때 빈 마이룸이 생성 - User Controller Layer 에서 사용
	 * @return MyRoom 빈 마이룸
	 */
	@Override
	@Transactional
	public MyRoom createMyRoom() {
		return myRoomRepository.save(MyRoom.createMyRoom());
	}

	/**
	 * userRoomId에 해당되는 마이룸 정보 반환
	 * @param userRoomIdToEnter 입장하고자 하는 유저의 유저룸 ID
	 * @return MyRoomResponse 마이룸 정보
	 */
	@Override
	@Transactional(readOnly = true)
	public MyRoomResponse getMyRoom(Integer userRoomIdToEnter) {
		UserRoom userRoom = userRoomRepository.findById(userRoomIdToEnter)
			.orElseThrow(() -> new NotFoundException(ResponseCode.USER_ROOM_NOT_FOUND));
		User user = userRepository.findById(userRoom.getUser().getUserId())
			.orElseThrow(() -> new NotFoundException(ResponseCode.USER_NOT_FOUND));
		MyRoom myRoom = user.getMyRoom();
		List<HasItemInfoResponse> hasItemInfoResponses = myRoom.getItems().stream()
			.filter(HasItem::getEquippedYn)
			.map(HasItemInfoResponse::fromEntity)
			.toList();

		return MyRoomResponse.fromEntity(myRoom, hasItemInfoResponses);
	}

	/**
	 * 마이룸에 아이템을 장착
	 * 1. 장착하고자 하는 아이템의 타입 조회
	 * 2. 해당 타입에 현재 다른 아이템이 장착되어 있으면 해제
	 * 3. 장착하고자 하는 아이템 장착
	 * @param userId 유저 ID
	 * @param hasItemId 인벤토리에서 장착할 아이템 ID
	 * @return MyRoomResponse 업데이트 후 마이룸 정보
	 */
	@Override
	@Transactional
	public MyRoomResponse equipItem(Integer userId, Integer hasItemId) {
		User user = userRepository.findById(userId)
			.orElseThrow(() -> new NotFoundException(ResponseCode.USER_NOT_FOUND));

		MyRoom myRoom = user.getMyRoom();

		HasItem hasItem = hasItemRepository.findById(hasItemId)
			.orElseThrow(() -> new NotFoundException(ResponseCode.INVENTORY_NOT_FOUND));

		myRoom.unequipPreItemAndEquipItem(hasItem);

		List<HasItemInfoResponse> hasItemInfoResponses = myRoom.getItems().stream()
			.filter(HasItem::getEquippedYn)
			.map(HasItemInfoResponse::fromEntity)
			.toList();

		return MyRoomResponse.fromEntity(myRoom, hasItemInfoResponses);
	}

	/**
	 * 마이룸에 아이템 장착 해제
	 *  1. 마이룸에 해당 타입 해제 (null)
	 * 	2. 인벤토리에 장착해제 표시 (false)
	 * @param userId 유저 ID
	 * @param itemType 인벤토리에서 장착 해제할 아이템 타입
	 * @return MyRoomResponse 업데이트 후 마이룸 정보
	 */
	@Override
	@Transactional
	public MyRoomResponse unequipItem(Integer userId, ItemType itemType) {
		User user = userRepository.findById(userId)
			.orElseThrow(() -> new NotFoundException(ResponseCode.USER_NOT_FOUND));

		MyRoom myRoom = user.getMyRoom();

		// 해당 타입의 아이템들을 모두 unequip 처리
		List<HasItem> hasItems = hasItemRepository.findByMyRoom(myRoom);
		hasItems.forEach(myRoom::unequipItem);

		List<HasItemInfoResponse> hasItemInfoResponses = myRoom.getItems().stream()
			.filter(item -> !item.getEquippedYn()) // unequipped 된 아이템 필터링
			.map(HasItemInfoResponse::fromEntity)
			.toList();

		return MyRoomResponse.fromEntity(myRoom, hasItemInfoResponses);
	}
}
