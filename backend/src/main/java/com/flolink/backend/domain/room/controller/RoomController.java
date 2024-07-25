package com.flolink.backend.domain.room.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.flolink.backend.domain.room.dto.request.RoomCreateRequest;
import com.flolink.backend.domain.room.dto.request.RoomUpdateRequest;
import com.flolink.backend.domain.room.dto.response.RoomMemberInfoResponse;
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
@RequestMapping("/room")
@RequiredArgsConstructor
public class RoomController {

	private final RoomService roomService;

	@GetMapping("/{userId}/list")
	@Operation(summary = "모든 방 정보 불러오기")
	public ResponseEntity<?> getAllRooms(@PathVariable Integer userId) {
		log.info("===모든 방 정보 불러오기 START===");
		List<RoomSummarizeResponse> roomSummarizeResponses = roomService.getAllRooms(userId);
		log.info("===모든 방 정보 불러오기 END===");
		return ResponseEntity.ok(CommonResponse.of(ResponseCode.COMMON_SUCCESS, roomSummarizeResponses));
	}

	@PostMapping("/create")
	@Operation(summary = "새로운 방 생성하기")
	public ResponseEntity<?> createRoom(@RequestBody RoomCreateRequest roomCreateRequest) {
		log.info("===새로운 방 생성 START===");
		Integer userId = 1;
		RoomSummarizeResponse roomSummarizeResponse = roomService.createRoom(userId, roomCreateRequest);
		log.info("===새로운 방 생성 END===");
		return ResponseEntity.ok(CommonResponse.of(ResponseCode.COMMON_SUCCESS, roomSummarizeResponse));
	}

	@PostMapping("/register/{roomId}")
	@Operation(summary = "기존 가족 방에 가입하기")
	public ResponseEntity<?> registerRoom(@PathVariable final Integer roomId) {
		log.info("===기존 가족 방에 가입하기 START===");
		Integer userId = 1;
		RoomSummarizeResponse roomSummarizeResponse = roomService.registerRoom(userId, roomId);
		log.info("===기존 가족 방에 가입하기 END===");
		return roomSummarizeResponse == null ?
			ResponseEntity.ok(CommonResponse.of(ResponseCode.ROOM_ALREADY_ENTERED))
			: ResponseEntity.ok(CommonResponse.of(ResponseCode.COMMON_SUCCESS, roomSummarizeResponse));
	}

	@GetMapping("/{roomId}")
	@Operation(summary = "가족 방 구성원 정보 불러오기", description = "가족방의 구성원들의 정보를 반환.")
	public ResponseEntity<?> getRoomMemberInfos(@PathVariable final Integer roomId) {
		log.info("===가족 방 구성원 정보 불러오기 START===");
		Integer userId = 1;
		List<RoomMemberInfoResponse> roomMemberInfoResponses = roomService.getRoomMemberInfos(userId, roomId);
		log.info("===가족 방 구성원 정보 불러오기 END===");
		return ResponseEntity.ok(CommonResponse.of(ResponseCode.COMMON_SUCCESS, roomMemberInfoResponses));
	}

	@PatchMapping("/{roomId}")
	@Operation(summary = "가족 방 상세 정보 수정하기")
	public ResponseEntity<?> updateRoomDetail(@RequestBody final RoomUpdateRequest roomUpdateRequest) {
		log.info("===가족 방 상세 정보 수정하기 START===");
		Integer userId = 1;
		RoomSummarizeResponse roomSummarizeResponse = roomService.updateRoomDetail(userId, roomUpdateRequest);
		log.info("===가족 방 상세 정보 수정하기 END===");
		return ResponseEntity.ok(CommonResponse.of(ResponseCode.COMMON_SUCCESS));
	}

	//TODO 오늘의 기분 클릭 시, 상태메시지 list-up 해주는 api 구현

}
