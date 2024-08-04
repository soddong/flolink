package com.flolink.backend.domain.room.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.flolink.backend.domain.plant.entity.ActivityPoint;
import com.flolink.backend.domain.plant.service.PlantService;
import com.flolink.backend.domain.room.dto.request.RoomCreateRequest;
import com.flolink.backend.domain.room.dto.request.RoomParticipateRequest;
import com.flolink.backend.domain.room.dto.request.RoomUpdateRequest;
import com.flolink.backend.domain.room.dto.response.RoomMemberInfoResponse;
import com.flolink.backend.domain.room.dto.response.RoomSummarizeResponse;
import com.flolink.backend.domain.room.entity.Nickname;
import com.flolink.backend.domain.room.entity.Room;
import com.flolink.backend.domain.room.entity.UserRoom;
import com.flolink.backend.domain.room.repository.MessageRepository;
import com.flolink.backend.domain.room.repository.RoomRepository;
import com.flolink.backend.domain.room.repository.UserRoomRepository;
import com.flolink.backend.domain.user.entity.User;
import com.flolink.backend.domain.user.repository.UserRepository;
import com.flolink.backend.global.common.ResponseCode;
import com.flolink.backend.global.common.exception.NotFoundException;
import com.flolink.backend.global.common.exception.UnAuthorizedException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RoomServiceImpl implements RoomService {

	private final PlantService plantService;

	private final RoomRepository roomRepository;
	private final UserRepository userRepository;
	private final UserRoomRepository userRoomRepository;
	private final MessageRepository messageRepository;

	@Override
	public List<RoomSummarizeResponse> getAllRooms(final Integer userId) {
		User user = findUserById(userId);
		return user.getUserRoomList()
			.stream()
			.map((UserRoom) -> RoomSummarizeResponse.fromEntity(UserRoom.getRoom()))
			.toList();
	}

	public RoomSummarizeResponse getRoomById(final Integer roomId) {
		Room room = findRoomById(roomId);
		return RoomSummarizeResponse.fromEntity(room);
	}

	@Override
	@Transactional
	public RoomSummarizeResponse createRoom(final Integer userId, final RoomCreateRequest roomCreateRequest) {
		User user = findUserById(userId);

		Room room = roomRepository.save(
			roomCreateRequest.toEntity()
		);

		UserRoom userRoom = userRoomRepository.save(
			UserRoom.of(user, room)
		);

		plantService.createPlant(userRoom, room);
		return RoomSummarizeResponse.fromEntity(room);
	}

	@Override
	@Transactional
	public RoomSummarizeResponse registerRoom(final Integer userId,
		final RoomParticipateRequest roomParticipateRequest) {
		User user = findUserById(userId);
		Room room = findRoomById(roomParticipateRequest.getRoomId());

		for (UserRoom userRoom : user.getUserRoomList()) {
			if (Objects.equals(userRoom.getRoom(), room)) { //이미 가입 된 경우 200 주되 data는 비움
				return null;
			}
		}
		if (!room.getRoomParticipatePassword().equals(roomParticipateRequest.getRoomParticipatePassword())) {
			throw new UnAuthorizedException(ResponseCode.NOT_AUTHORIZED);
		}
		userRoomRepository.save(UserRoom.of(user, room));
		return RoomSummarizeResponse.fromEntity(room);
	}

	@Override
	public String getMyRole(final Integer userId, final Integer roomId) {
		User user = findUserById(userId);
		Room room = findRoomById(roomId);
		UserRoom userRoom = findUserRoomByUserAndRoom(user, room);
		return userRoom.getRole();
	}

	@Override
	public List<RoomMemberInfoResponse> getRoomMemberInfos(final Integer userId, final Integer roomId) {
		User user = findUserById(userId);
		Room room = findRoomById(roomId);
		UserRoom userRoom = findUserRoomByUserAndRoom(user, room);

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
	public RoomSummarizeResponse updateEmotion(final Integer userId, final RoomUpdateRequest roomUpdateRequest) {
		User user = findUserById(userId);
		Room room = findRoomById(roomUpdateRequest.getRoomId());
		UserRoom userRoom = findUserRoomByUserAndRoom(user, room);
		if (userRoom != null) {
			userRoom.getMessage().setContent(roomUpdateRequest.getMessage());
		}
		return RoomSummarizeResponse.fromEntity(room);
	}

	@Override
	@Transactional
	public RoomSummarizeResponse updateRoomName(final Integer userId, final RoomUpdateRequest roomUpdateRequest) {
		User user = findUserById(userId);
		Room room = findRoomById(roomUpdateRequest.getRoomId());
		UserRoom userRoom = findUserRoomByUserAndRoom(user, room);

		if (userRoom.getRole().equalsIgnoreCase("admin")) {
			room.setRoomName(roomUpdateRequest.getRoomName());
		}

		return RoomSummarizeResponse.fromEntity(room);
	}

	@Override
	@Transactional
	public RoomSummarizeResponse updateParticipatePassword(final Integer userId,
		final RoomUpdateRequest roomUpdateRequest) {
		User user = findUserById(userId);
		Room room = findRoomById(roomUpdateRequest.getRoomId());
		UserRoom userRoom = findUserRoomByUserAndRoom(user, room);

		if (userRoom.getRole().equalsIgnoreCase("admin")) { //validate는 controller에서
			room.setRoomParticipatePassword(roomUpdateRequest.getRoomParticipatePassword());
		}

		return RoomSummarizeResponse.fromEntity(room);
	}

	@Override
	@Transactional
	public RoomSummarizeResponse updateNotice(final Integer userId, final RoomUpdateRequest roomUpdateRequest) {
		User user = findUserById(userId);
		Room room = findRoomById(roomUpdateRequest.getRoomId());
		UserRoom userRoom = findUserRoomByUserAndRoom(user, room);

		if (userRoom != null) {
			room.setNotice(roomUpdateRequest.getNotice());
		}

		return RoomSummarizeResponse.fromEntity(room);
	}

	@Override
	@Transactional
	public String exitRoom(final Integer userId, final Integer roomId) {
		User user = findUserById(userId);
		Room room = findRoomById(roomId);
		UserRoom userRoom = findUserRoomByUserAndRoom(user, room);

		if (userRoom.getRole().equalsIgnoreCase("admin")) {
			List<UserRoom> userRoomList = room.getUserRoomList();
			userRoomList.sort(Comparator.comparing(UserRoom::getCreateAt));
			for (UserRoom ur : userRoomList) {
				if (!ur.getUser().getUserId().equals(userId)) {
					ur.setRole("admin");
					break;
				}
			}
		}
		userRoomRepository.delete(userRoom);

		if (room.getUserRoomList().isEmpty()) {
			roomRepository.delete(room);
		}
		return "success";
	}

	@Override
	@Transactional
	public String kickRoomMember(final Integer userId, final Integer roomId, final Integer targetUserRoomId) {
		String myRole = getMyRole(userId, roomId);
		if (!myRole.equalsIgnoreCase("admin")) {
			return "failed";
		}

		UserRoom userRoom = userRoomRepository.findUserRoomByUserRoomId(targetUserRoomId);

		userRoomRepository.delete(userRoom);
		return "success";
	}

	@Override
	@Transactional
	public void enterRoom(final Integer userId, final Integer roomId) {
		User user = findUserById(userId);
		Room room = findRoomById(roomId);
		UserRoom userRoom = findUserRoomByUserAndRoom(user, room);
		if (isFirstAttendanceOfToday(userRoom.getLastLoginTime())) {
			plantService.updateExp(userRoom, ActivityPoint.ATTENDANCE);
		}
		userRoom.updateLoginTime();
	}

	private User findUserById(final Integer userId) {
		return userRepository.findById(userId).orElseThrow(() -> new NotFoundException(ResponseCode.USER_NOT_FOUND));
	}

	private Room findRoomById(final Integer roomId) {
		return roomRepository.findById(roomId).orElseThrow(() -> new NotFoundException(ResponseCode.ROOM_NOT_FOUND));
	}

	private UserRoom findUserRoomByUserAndRoom(final User user, final Room room) {
		return userRoomRepository.findByUserAndRoom(user, room)
			.orElseThrow(() -> new NotFoundException(ResponseCode.USER_ROOM_NOT_FOUND));
	}

	private boolean isFirstAttendanceOfToday(LocalDateTime lastLoginTime) {
		if (lastLoginTime == null) {
			return true;
		}
		LocalDate today = LocalDate.now();
		LocalDate plantUpdateDate = lastLoginTime.toLocalDate();
		System.out.println(today);
		System.out.println(plantUpdateDate);
		System.out.println(plantUpdateDate.isBefore(today));
		return plantUpdateDate.isBefore(today);
	}
}
