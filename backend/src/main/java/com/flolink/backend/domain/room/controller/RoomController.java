package com.flolink.backend.domain.room.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.flolink.backend.domain.room.service.RoomService;
import com.flolink.backend.global.common.CommonResponse;
import com.flolink.backend.global.common.ResponseCode;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@Tag(name ="Room API", description = "가족방과 관련된 API")
@Slf4j
@RequestMapping("/room")
@RequiredArgsConstructor
public class RoomController {

	private final RoomService roomService;

	@GetMapping("/{user_id}/list")
	@Operation(summary = "모든 방 정보 불러오기")
	public ResponseEntity<?> getAllRooms(@PathVariable Integer user_id) {
		log.info("===모든 방 정보 불러오기 START===");
		//서비스로직
		log.info("===모든 방 정보 불러오기 END===");
		return ResponseEntity.ok(CommonResponse.of(ResponseCode.COMMON_SUCCESS));
	}

	@PostMapping("/create")
	@Operation(summary = "새로운 방 생성하기")
	public ResponseEntity<?> createRoom() {
		log.info("===새로운 방 생성 START===");
		log.info("===새로운 방 생성 END===");
		return ResponseEntity.ok(CommonResponse.of(ResponseCode.COMMON_SUCCESS));
	}

	@PostMapping("/register")
	@Operation(summary = "기존 가족 방에 가입하기")
	public ResponseEntity<?> registerRoom() {
		log.info("===기존 가족 방에 가입하기 START===");
		log.info("===기존 가족 방에 가입하기 END===");
		return ResponseEntity.ok(CommonResponse.of(ResponseCode.COMMON_SUCCESS));
	}

	@GetMapping("/{room_id}")
	@Operation(summary = "가족 방 상세 정보 불러오기")
	public ResponseEntity<?> getRoomDetail(@PathVariable Integer room_id) {
		log.info("===가족 방 상세 정보 불러오기 START===");
		log.info("===가족 방 상세 정보 불러오기 END===");
		return ResponseEntity.ok(CommonResponse.of(ResponseCode.COMMON_SUCCESS));
	}

	@PatchMapping("/{room_id}")
	@Operation(summary = "가족 방 상세 정보 수정하기")
	public ResponseEntity<?> updateRoomDetail(@PathVariable Integer room_id) {
		log.info("===가족 방 상세 정보 수정하기 START===");
		log.info("===가족 방 상세 정보 수정하기 END===");
		return ResponseEntity.ok(CommonResponse.of(ResponseCode.COMMON_SUCCESS));
	}

}
