package com.flolink.backend.domain.myroom.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.flolink.backend.domain.myroom.dto.response.MyRoomResponse;
import com.flolink.backend.domain.myroom.entity.HasItem;
import com.flolink.backend.domain.myroom.entity.MyRoom;
import com.flolink.backend.domain.myroom.repository.HasItemRepository;
import com.flolink.backend.domain.myroom.repository.MyRoomRepository;
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
	 * 마이룸 정보 반환
	 * @param userId 사용자 ID
	 * @return MyRoomResponse 마이룸 정보
	 */
	@Override
	@Transactional(readOnly = true)
	public MyRoomResponse getMyRoom(Integer userId) {
		User user = userRepository.findById(userId)
			.orElseThrow(() -> new NotFoundException(ResponseCode.USER_NOT_FOUND));

		MyRoom myRoom = myRoomRepository.findById(1)
			.orElseThrow(() -> new NotFoundException(ResponseCode.MY_ROOM_NOT_FOUND));

		return MyRoomResponse.fromEntity(myRoom);
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

		// TODO: user.getMyRoomId() 맵핑
		MyRoom myRoom = myRoomRepository.findById(1)
			.orElseThrow(() -> new NotFoundException(ResponseCode.MY_ROOM_NOT_FOUND));

		HasItem hasItem = hasItemRepository.findById(hasItemId)
			.orElseThrow(() -> new NotFoundException(ResponseCode.INVENTORY_NOT_FOUND));

		myRoom.unequipPreItemAndEquipItem(hasItem);

		return MyRoomResponse.fromEntity(myRoom);
	}

	/**
	 * 마이룸에 아이템 장착 해제
	 *  1. 마이룸에 해당 타입 해제 (null)
	 * 	2. 인벤토리에 장착해제 표시 (false)
	 * @param userId 유저 ID
	 * @param hasItemId 인벤토리에서 장착 해제할 아이템 ID
	 * @return MyRoomResponse 업데이트 후 마이룸 정보
	 */
	@Override
	@Transactional
	public MyRoomResponse unequipItem(Integer userId, Integer hasItemId) {
		User user = userRepository.findById(userId)
			.orElseThrow(() -> new NotFoundException(ResponseCode.USER_NOT_FOUND));

		// TODO: MyRoom myRoom = user.getMyRoom();
		MyRoom myRoom = myRoomRepository.findById(1)
			.orElseThrow(() -> new NotFoundException(ResponseCode.MY_ROOM_NOT_FOUND));

		HasItem hasItem = hasItemRepository.findById(hasItemId)
			.orElseThrow(() -> new NotFoundException(ResponseCode.INVENTORY_NOT_FOUND));

		myRoom.unequipItem(hasItem);

		return MyRoomResponse.fromEntity(myRoom);
	}
}
