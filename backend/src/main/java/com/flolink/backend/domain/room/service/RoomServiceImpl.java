package com.flolink.backend.domain.room.service;

import java.util.List;
import java.util.Objects;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.flolink.backend.domain.room.dto.request.RoomCreateRequest;
import com.flolink.backend.domain.room.dto.request.RoomUpdateRequest;
import com.flolink.backend.domain.room.dto.response.RoomMemberInfoResponse;
import com.flolink.backend.domain.room.dto.response.RoomSummarizeResponse;
import com.flolink.backend.domain.room.entity.Nickname;
import com.flolink.backend.domain.room.entity.Room;
import com.flolink.backend.domain.room.entity.UserRoom;
import com.flolink.backend.domain.room.repository.RoomRepository;
import com.flolink.backend.domain.room.repository.UserRoomRepository;
import com.flolink.backend.domain.user.entity.User;
import com.flolink.backend.domain.user.repository.UserRepository;
import com.flolink.backend.global.common.ResponseCode;
import com.flolink.backend.global.common.exception.NotFoundException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RoomServiceImpl implements RoomService {

	private final RoomRepository roomRepository;
	private final UserRepository userRepository;
	private final UserRoomRepository userRoomRepository;

	@Override
	public List<RoomSummarizeResponse> getAllRooms(final Integer userId) {
		User user = findUserById(userId);
		return user.getUserRoomList()
			.stream()
			.map((UserRoom) -> RoomSummarizeResponse.fromEntity(UserRoom.getRoom()))
			.toList();
	}

	@Override
	@Transactional
	public RoomSummarizeResponse createRoom(final Integer userId, final RoomCreateRequest roomCreateRequest) {
		User user = findUserById(userId);
		Room room = roomCreateRequest.toEntity();
		room = roomRepository.save(room);
		userRoomRepository.save(UserRoom.of(user, room));
		return RoomSummarizeResponse.fromEntity(room);
	}

	@Override
	@Transactional
	public RoomSummarizeResponse registerRoom(final Integer userId, final Integer roomId) {
		User user = findUserById(userId);
		Room room = roomRepository.findById(roomId)
			.orElseThrow(() -> new NotFoundException(ResponseCode.ROOM_NOT_FOUND));
		for (UserRoom userRoom : user.getUserRoomList()) {
			if (Objects.equals(userRoom.getRoom(), room)) { //이미 가입 된 경우 200 주되 data는 비움
				return null;
			}
		}
		userRoomRepository.save(UserRoom.of(user, room));
		return RoomSummarizeResponse.fromEntity(room);

	}

	@Override
	public List<RoomMemberInfoResponse> getRoomMemberInfos(final Integer userId, final Integer roomId) {
		User user = findUserById(userId);
		Room room = findRoomById(roomId);
		UserRoom userRoom = userRoomRepository.findByUserAndRoom(user, room);
		List<Nickname> nicknames = userRoom.getNickNameList();
		List<RoomMemberInfoResponse> roomMemberInfoResponses = room.getUserRoomList()
			.stream()
			.map(RoomMemberInfoResponse::fromUserRoomEntity)
			.toList();

		for (RoomMemberInfoResponse response : roomMemberInfoResponses) {
			for (Nickname nickname : nicknames) {
				if (response.getTargetUserRoomId().equals(nickname.getTargetUserRoomId())) {
					response.setTargetNickname(nickname.getTargetNickname());
					break;
				}
			}
		}
		return roomMemberInfoResponses;
	}

	@Override
	@Transactional
	public RoomSummarizeResponse updateRoomDetail(final Integer userId, final RoomUpdateRequest roomUpdateRequest) {
		User user = findUserById(userId);
		Room room = findRoomById(roomUpdateRequest.getRoomId());
		room.setRoomName(roomUpdateRequest.getRoomName());
		roomRepository.save(room);
		return RoomSummarizeResponse.fromEntity(room);
	}

	private User findUserById(final Integer userId) {
		return userRepository.findById(userId).orElseThrow(() -> new NotFoundException(ResponseCode.USER_NOT_FOUND));
	}

	private Room findRoomById(final Integer roomId) {
		return roomRepository.findById(roomId).orElseThrow(() -> new NotFoundException(ResponseCode.ROOM_NOT_FOUND));
	}
}
