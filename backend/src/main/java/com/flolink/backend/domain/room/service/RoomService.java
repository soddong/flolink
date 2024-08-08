package com.flolink.backend.domain.room.service;

import java.util.List;

import com.flolink.backend.domain.room.dto.request.NicknameUpdateRequest;
import com.flolink.backend.domain.room.dto.request.RoomCreateRequest;
import com.flolink.backend.domain.room.dto.request.RoomParticipateRequest;
import com.flolink.backend.domain.room.dto.request.RoomUpdateRequest;
import com.flolink.backend.domain.room.dto.response.RoomMemberInfoResponse;
import com.flolink.backend.domain.room.dto.response.RoomSummarizeResponse;
import com.flolink.backend.domain.room.entity.Room;
import com.flolink.backend.domain.room.entity.UserRoom;
import com.flolink.backend.domain.user.entity.User;

public interface RoomService {

	List<RoomSummarizeResponse> getAllRooms(final Integer userId);

	RoomSummarizeResponse getRoomById(final Integer roomId);

	RoomSummarizeResponse createRoom(final Integer userId, final RoomCreateRequest roomCreateRequest);

	RoomSummarizeResponse registerRoom(final Integer userId, final RoomParticipateRequest roomParticipateRequest);

	String getMyRole(final Integer userId, final Integer roomId);

	List<RoomMemberInfoResponse> getRoomMemberInfos(final Integer userId, final Integer roomId);

	RoomSummarizeResponse updateRoomDetail(final Integer userId, final RoomUpdateRequest roomUpdateRequest);

	String exitRoom(final Integer userId, final Integer roomId);

	String kickRoomMember(final Integer userId, final Integer roomId, final Integer targetUserRoomId);

	void enterRoom(final Integer userId, final Integer roomId);

	String updateRoomMemberNickname(final Integer userId, final NicknameUpdateRequest nicknameUpdateRequest);

	User findUserById(final Integer userId);

	Room findRoomById(final Integer roomId);

	UserRoom findUserRoomByUserAndRoom(final User user, final Room room);

	UserRoom findUserRoomByUserIdAndRoomId(final Integer userId, final Integer roomId);

	UserRoom findUserRoomByUserRoomId(final Integer userRoomId);

	Integer getMyUserRoomId(final Integer userId, final Integer roomId);
}
