package com.flolink.backend.domain.room.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.flolink.backend.domain.plant.entity.ActivityPoint;
import com.flolink.backend.domain.plant.entity.Plant;
import com.flolink.backend.domain.plant.entity.UserExp;
import com.flolink.backend.domain.plant.repository.PlantRepository;
import com.flolink.backend.domain.plant.repository.UserExpRepository;
import com.flolink.backend.domain.plant.service.PlantService;
import com.flolink.backend.domain.room.dto.request.NicknameUpdateRequest;
import com.flolink.backend.domain.room.dto.request.RoomCreateRequest;
import com.flolink.backend.domain.room.dto.request.RoomParticipateRequest;
import com.flolink.backend.domain.room.dto.request.RoomUpdateRequest;
import com.flolink.backend.domain.room.dto.response.RoomMemberInfoResponse;
import com.flolink.backend.domain.room.dto.response.RoomSummarizeResponse;
import com.flolink.backend.domain.room.entity.Nickname;
import com.flolink.backend.domain.room.entity.Room;
import com.flolink.backend.domain.room.entity.UserRoom;
import com.flolink.backend.domain.room.repository.NicknameRepository;
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
	private final UserExpRepository userExpRepository;
	private final UserRoomRepository userRoomRepository;
	private final NicknameRepository nicknameRepository;
	private final PlantRepository plantRepository;

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

		Room room = roomRepository.save(roomCreateRequest.toEntity());

		UserRoom userRoom = userRoomRepository.save(UserRoom.of(user, room));
		userRoom.setRole("admin");

		Plant createdPlant = plantService.createPlant(userRoom, room);
		userExpRepository.save(UserExp.of(userRoom.getUser().getUserId(), createdPlant));

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
			throw new UnAuthorizedException(ResponseCode.WRONG_PARTICIPATION_PASSWORD);
		}
		UserRoom userRoom = userRoomRepository.save(UserRoom.of(user, room));
		Plant plant = plantRepository.findByRoomRoomId(room.getRoomId())
			.orElseThrow(() -> new NotFoundException(ResponseCode.PLANT_NOT_FOUND));

		if (!userExpRepository.existsByPlantIdAndUserId(userId, plant.getPlantId())) {
			userExpRepository.save(UserExp.of(userRoom.getUser().getUserId(), plant));
		}

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
		room.getUserRoomList().remove(userRoom);
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

		UserRoom userRoom = findUserRoomByUserRoomId(targetUserRoomId);

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

	@Override
	@Transactional
	public String updateRoomMemberNickname(final Integer userId, final NicknameUpdateRequest nicknameUpdateRequest) {

		UserRoom userRoom = findUserRoomByUserIdAndRoomId(userId, nicknameUpdateRequest.getRoomId());
		Optional<Nickname> optionalNickname = nicknameRepository.findByUserRoomUserRoomIdAndTargetUserRoomId(
			userRoom.getUserRoomId(), nicknameUpdateRequest.getTargetUserRoomId());

		Nickname nickname = null;

		if (optionalNickname.isPresent()) {
			nickname = optionalNickname.get();
			nickname.setTargetNickname(nicknameUpdateRequest.getTargetNickname());
			nicknameRepository.save(nickname);
		} else {
			nickname = Nickname.builder()
				.userRoom(userRoom)
				.targetUserRoomId(nicknameUpdateRequest.getTargetUserRoomId())
				.targetNickname(nicknameUpdateRequest.getTargetNickname())
				.build();
			nicknameRepository.save(nickname);
		}
		return "success";
	}

	@Override
	@Transactional
	public RoomSummarizeResponse updateRoomDetail(final Integer userId, final RoomUpdateRequest roomUpdateRequest) {
		User user = findUserById(userId);
		Room room = findRoomById(roomUpdateRequest.getRoomId());
		UserRoom userRoom = findUserRoomByUserAndRoom(user, room);
		if (userRoom == null) {
			throw new NotFoundException(ResponseCode.USER_ROOM_NOT_FOUND);
		}

		if (roomUpdateRequest.getRoomParticipatePassword() != null) {
			if (!userRoom.getRole().equalsIgnoreCase("admin")) {
				throw new UnAuthorizedException(ResponseCode.NOT_AUTHORIZED);
			}
			room.setRoomParticipatePassword(roomUpdateRequest.getRoomParticipatePassword());
		}
		if (roomUpdateRequest.getRoomName() != null) {
			if (!userRoom.getRole().equalsIgnoreCase("admin")) {
				throw new UnAuthorizedException(ResponseCode.NOT_AUTHORIZED);
			}
			room.setRoomName(roomUpdateRequest.getRoomName());
		}
		if (roomUpdateRequest.getNotice() != null) {
			room.setNotice(roomUpdateRequest.getNotice());
		}
		roomRepository.save(room);
		return RoomSummarizeResponse.fromEntity(room);
	}

	public User findUserById(final Integer userId) {
		return userRepository.findById(userId).orElseThrow(() -> new NotFoundException(ResponseCode.USER_NOT_FOUND));
	}

	public Room findRoomById(final Integer roomId) {
		return roomRepository.findById(roomId).orElseThrow(() -> new NotFoundException(ResponseCode.ROOM_NOT_FOUND));
	}

	public UserRoom findUserRoomByUserAndRoom(final User user, final Room room) {
		return userRoomRepository.findByUserAndRoom(user, room)
			.orElseThrow(() -> new NotFoundException(ResponseCode.USER_ROOM_NOT_FOUND));
	}

	public UserRoom findUserRoomByUserIdAndRoomId(final Integer userId, final Integer roomId) {
		return userRoomRepository.findByUserUserIdAndRoomRoomId(userId, roomId)
			.orElseThrow(() -> new NotFoundException(ResponseCode.USER_ROOM_NOT_FOUND));

	}

	public UserRoom findUserRoomByUserRoomId(final Integer userRoomId) {
		return userRoomRepository.findUserRoomByUserRoomId(userRoomId)
			.orElseThrow(() -> new NotFoundException(ResponseCode.USER_ROOM_NOT_FOUND));
	}

	@Override
	public Integer getMyUserRoomId(final Integer userId, final Integer roomId) {
		Integer userRoomId = null;
		UserRoom userRoom = findUserRoomByUserIdAndRoomId(userId, roomId);
		userRoomId = userRoom.getUserRoomId();
		return userRoomId;
	}

	private boolean isFirstAttendanceOfToday(LocalDateTime lastLoginTime) {
		if (lastLoginTime == null) {
			return true;
		}
		LocalDate today = LocalDate.now();
		LocalDate plantUpdateDate = lastLoginTime.toLocalDate();
		return plantUpdateDate.isBefore(today);
	}
}
