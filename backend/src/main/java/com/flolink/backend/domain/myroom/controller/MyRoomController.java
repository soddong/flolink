package com.flolink.backend.domain.myroom.controller;

import static com.flolink.backend.global.common.ResponseCode.*;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.flolink.backend.domain.myroom.dto.request.MyRoomDetailRequest;
import com.flolink.backend.domain.myroom.dto.response.HasItemInfoResponse;
import com.flolink.backend.domain.myroom.dto.response.MyRoomResponse;
import com.flolink.backend.domain.myroom.service.HasItemService;
import com.flolink.backend.domain.myroom.service.MyRoomService;
import com.flolink.backend.domain.store.entity.ItemType;
import com.flolink.backend.domain.user.dto.response.CustomUserDetails;
import com.flolink.backend.global.common.CommonResponse;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/myroom")
@RequiredArgsConstructor
@Tag(name = "MyRoom API", description = "마이룸과 관련된 API")
public class MyRoomController {

	private final HasItemService hasItemService;
	private final MyRoomService myRoomService;

	@PostMapping
	@Operation(summary = "마이룸 정보 조회")
	public ResponseEntity<CommonResponse> getMyRoom(@RequestBody final MyRoomDetailRequest request) {
		MyRoomResponse inventory = myRoomService.getMyRoom(request.getUserRoomId());
		return ResponseEntity.ok(CommonResponse.of(COMMON_SUCCESS, inventory));
	}

	@PostMapping("/equip")
	@Operation(summary = "마이룸에 아이템 장착")
	public ResponseEntity<CommonResponse> equipItem(@RequestParam final Integer hasItemId,
		Authentication authentication) {
		CustomUserDetails customUserDetails = (CustomUserDetails)authentication.getPrincipal();
		MyRoomResponse response = myRoomService.equipItem(customUserDetails.getUserId(), hasItemId);
		return ResponseEntity.ok(CommonResponse.of(COMMON_SUCCESS, response));
	}

	@PostMapping("/unequip")
	@Operation(summary = "마이룸에 아이템 장착 해제")
	public ResponseEntity<CommonResponse> unequipItem(@RequestParam final ItemType itemType,
		Authentication authentication) {
		CustomUserDetails customUserDetails = (CustomUserDetails)authentication.getPrincipal();
		MyRoomResponse response = myRoomService.unequipItem(customUserDetails.getUserId(), itemType);
		return ResponseEntity.ok(CommonResponse.of(COMMON_SUCCESS, response));
	}

	@GetMapping("/inventory")
	@Operation(summary = "인벤토리 조회")
	public ResponseEntity<CommonResponse> getInventory(Authentication authentication) {
		CustomUserDetails customUserDetails = (CustomUserDetails)authentication.getPrincipal();
		List<HasItemInfoResponse> inventory = hasItemService.getHasItems(customUserDetails.getUserId());
		return ResponseEntity.ok(CommonResponse.of(COMMON_SUCCESS, inventory));
	}

}
