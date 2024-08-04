package com.flolink.backend.domain.room.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.flolink.backend.domain.plant.service.PlantService;
import com.flolink.backend.domain.room.dto.request.RoomCreateRequest;
import com.flolink.backend.domain.room.dto.request.RoomParticipateRequest;
import com.flolink.backend.domain.room.dto.request.RoomUpdateRequest;
import com.flolink.backend.domain.room.dto.response.RoomDetailResponse;
import com.flolink.backend.domain.room.dto.response.RoomSummarizeResponse;
import com.flolink.backend.domain.room.service.RoomService;
import com.flolink.backend.global.common.CommonResponse;
import com.flolink.backend.global.common.ResponseCode;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@Tag(name = "Room API", description = "가족방과 관련된 API")
@Slf4j
@RequestMapping("/rooms")
@RequiredArgsConstructor
public class RoomController {

	private final RoomService roomService;
	private final PlantService plantService;

	@GetMapping("")
	@Operation(summary = "모든 방 정보 불러오기")
	public ResponseEntity<?> getAllRooms() {
		log.info("===모든 방 정보 불러오기 START===");
		Integer userId = 1;
		List<RoomSummarizeResponse> roomSummarizeResponses = roomService.getAllRooms(userId);
		log.info("===모든 방 정보 불러오기 END===");
		return ResponseEntity.ok(CommonResponse.of(ResponseCode.COMMON_SUCCESS, roomSummarizeResponses));
	}

	@PostMapping("")
	@Operation(summary = "새로운 방 생성하기")
	public ResponseEntity<?> createRoom(@RequestBody final RoomCreateRequest roomCreateRequest) {
		log.info("===새로운 방 생성 START===");
		Integer userId = 1;
		RoomSummarizeResponse roomSummarizeResponse = roomService.createRoom(userId, roomCreateRequest);
		log.info("===새로운 방 생성 END===");
		return ResponseEntity.ok(CommonResponse.of(ResponseCode.COMMON_SUCCESS, roomSummarizeResponse));
	}

	@PostMapping("/register")
	@Operation(summary = "기존 가족 방에 가입하기")
	public ResponseEntity<?> registerRoom(@RequestBody final RoomParticipateRequest roomParticipateRequest) {
		log.info("===기존 가족 방에 가입하기 START===");
		Integer userId = 2;
		RoomSummarizeResponse roomSummarizeResponse = roomService.registerRoom(userId, roomParticipateRequest);
		log.info("===기존 가족 방에 가입하기 END===");
		return roomSummarizeResponse == null ? ResponseEntity.ok(CommonResponse.of(ResponseCode.ROOM_ALREADY_ENTERED)) :
			ResponseEntity.ok(CommonResponse.of(ResponseCode.COMMON_SUCCESS, roomSummarizeResponse));
	}

	@GetMapping("/{roomId}/me/role")
	@Operation(summary = "가족 방에서의 나의 권한 불러오기", description = "렌더링 용이며, 다른 api 요청 시에 포함할 필요는 없음")
	public ResponseEntity<?> getRoom(@PathVariable final Integer roomId) {
		log.info("===가족 방에서의 나의 권한 불러오기 START===");
		Integer userId = 1;
		String myRole = roomService.getMyRole(userId, roomId);
		log.info("===가족 방에서의 나의 권한 불러오기 END===");
		return (myRole == null || myRole.isBlank()) ?
			ResponseEntity.ok(CommonResponse.of(ResponseCode.USER_ROLE_NOT_FOUND)) :
			ResponseEntity.ok(CommonResponse.of(ResponseCode.COMMON_SUCCESS, myRole));
	}

	@GetMapping("/{roomId}")
	@Operation(summary = "가족 방 정보 (구성원, 식물) 불러오기", description = "가족방의 구성원들의 정보와 식물 정보를 반환.")
	public ResponseEntity<?> getRoomMemberInfos(@PathVariable final Integer roomId) {
		log.info("===가족 방 정보 (구성원, 식물) 불러오기 START===");
		Integer userId = 1;
		roomService.enterRoom(userId, roomId);
		RoomDetailResponse roomDetailResponse = RoomDetailResponse.of(
			roomService.getRoomById(roomId),
			roomService.getRoomMemberInfos(userId, roomId),
			plantService.getPlantInfo(roomId)
		);
		log.info("===가족 방 정보 (구성원, 식물) 불러오기 END===");
		return ResponseEntity.ok(CommonResponse.of(ResponseCode.COMMON_SUCCESS, roomDetailResponse));
	}

	@PatchMapping("/{roomId}")
	@Operation(summary = "가족 방 상세 정보 수정하기")
	public ResponseEntity<?> updateRoomDetail(@RequestBody final RoomUpdateRequest roomUpdateRequest) {
		log.info("===가족 방 상세 정보 수정하기 START===");
		Integer userId = 1;
		//TODO: validation
		RoomSummarizeResponse roomSummarizeResponse = null;
		if (roomUpdateRequest.getRoomParticipatePassword() != null) {
			roomSummarizeResponse = roomService.updateParticipatePassword(userId, roomUpdateRequest);
		}
		if (roomUpdateRequest.getRoomName() != null) {
			roomSummarizeResponse = roomService.updateRoomName(userId, roomUpdateRequest);
		}
		if (roomUpdateRequest.getNotice() != null) {
			roomSummarizeResponse = roomService.updateNotice(userId, roomUpdateRequest);
		}
		if (roomUpdateRequest.getMessage() != null) {
			roomSummarizeResponse = roomService.updateEmotion(userId, roomUpdateRequest);
		}
		log.info("===가족 방 상세 정보 수정하기 END===");
		return roomSummarizeResponse == null ? ResponseEntity.ok(CommonResponse.of(ResponseCode.NOT_FOUND_ERROR)) :
			ResponseEntity.ok(CommonResponse.of(ResponseCode.COMMON_SUCCESS, roomSummarizeResponse));
	}

	@DeleteMapping("/{roomId}")
	@Operation(summary = "가족 방 나가기")
	public ResponseEntity<?> exitRoom(@PathVariable final Integer roomId) {
		log.info("===가족 방 나가기 START===");
		Integer userId = 1;
		String done = roomService.exitRoom(userId, roomId);
		log.info("===가족 방 나가기 END===");
		return ResponseEntity.ok(CommonResponse.of(ResponseCode.COMMON_SUCCESS, done));
	}

	@DeleteMapping("/{roomId}/kick/{targetUserRoomId}")
	@Operation(summary = "가족 방 구성원 추방하기")
	public ResponseEntity<?> kickRoomMember(@PathVariable final Integer roomId,
		@PathVariable final Integer targetUserRoomId) {
		log.info("===가족 방 추방하기 START===");
		Integer userId = 1;
		String done = roomService.kickRoomMember(userId, roomId, targetUserRoomId);
		log.info("===가족 방 추방하기 END===");
		return ResponseEntity.ok(CommonResponse.of(ResponseCode.COMMON_SUCCESS, done));
	}
}
