package com.flolink.backend.domain.plant.controller;

import static com.flolink.backend.global.common.ResponseCode.*;

import java.time.Year;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.flolink.backend.domain.plant.dto.reqeust.PlantLocation;
import com.flolink.backend.domain.plant.dto.response.PlantHistoryDetailResponse;
import com.flolink.backend.domain.plant.dto.response.PlantHistorySummaryResponse;
import com.flolink.backend.domain.plant.dto.response.PlantWalkResultResponse;
import com.flolink.backend.domain.plant.service.PlantService;
import com.flolink.backend.domain.plant.service.plantexp.PlantExpHistoryService;
import com.flolink.backend.domain.plant.service.plantexp.PlantExpUserServiceImpl;
import com.flolink.backend.domain.plant.service.plantwalk.PlantWalkService;
import com.flolink.backend.domain.user.dto.response.CustomUserDetails;
import com.flolink.backend.global.common.CommonResponse;
import com.flolink.backend.global.common.ResponseCode;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/plants")
@RequiredArgsConstructor
@Tag(name = "Plant API", description = "기억정원과 관련된 API")
public class PlantController {

	private final PlantService plantService;
	private final PlantExpHistoryService plantExpHistoryService;
	private final PlantExpUserServiceImpl userExpService;

	@GetMapping("/{plantId}/historys")
	@Operation(summary = "기억정원 추억 리스트 불러오기", description = "연 단위 조회 (조회하고 싶은 연도 입력필요)")
	public ResponseEntity<?> getPlantHistorys(@PathVariable("plantId") final Integer plantId,
		@RequestParam(name = "year", required = false) final Integer year) {
		log.info("===기억정원 추억 리스트 불러오기 START===");
		int currentYear = (year != null) ? year : Year.now().getValue();
		PlantHistorySummaryResponse plantHistorys = plantExpHistoryService.getPlantHistorys(plantId, currentYear);
		log.info("===기억정원 추억 리스트 불러오기 END===");
		return ResponseEntity.ok(CommonResponse.of(ResponseCode.COMMON_SUCCESS, plantHistorys));
	}

	@GetMapping("/{plantId}/historys/{historyId}")
	@Operation(summary = "기억정원 추억 불러오기", description = "특정달의 추억 조회")
	public ResponseEntity<?> getPlantHistoryDetail(@PathVariable("plantId") final Integer plantId,
		@PathVariable("historyId") final Integer historyId, Authentication authentication) {
		log.info("===기억정원 추억 불러오기 START===");
		CustomUserDetails customUserDetails = (CustomUserDetails)authentication.getPrincipal();
		PlantHistoryDetailResponse historyDetailResponse = userExpService.getUserExpHistoryDetail(
			customUserDetails.getUserId(), historyId
		);
		log.info("===기억정원 추억 불러오기 END===");
		return ResponseEntity.ok(CommonResponse.of(ResponseCode.COMMON_SUCCESS, historyDetailResponse));
	}

	@PostMapping("/{plantId}/walk-start")
	@Operation(summary = "산책 시작", description = "산책 시작할때 위치를 저장")
	public ResponseEntity<CommonResponse> startPlantWalk(@PathVariable final Integer plantId,
		@RequestBody final PlantLocation plantLocation) {
		log.info("===산책 시작하기 START===");
		plantService.startWalk(plantId, plantLocation);
		log.info("===산책 시작하기 END===");
		return ResponseEntity.ok(CommonResponse.of(COMMON_SUCCESS, null));
	}

	@PostMapping("/{plantId}/walk-end")
	@Operation(summary = "산책 끝", description = "산책 종료 후 위치를 저장")
	public ResponseEntity<CommonResponse> endPlantWalk(@PathVariable("plantId") final Integer plantId,
		@RequestBody final PlantLocation plantLocation, Authentication authentication) {
		log.info("===산책 끝내기 START===");
		CustomUserDetails userDetails = (CustomUserDetails)authentication.getPrincipal();
		PlantWalkResultResponse plantWalkResponse = plantService.completeWalk(userDetails.getUserId(), plantId, plantLocation);
		log.info("===산책 끝내기 END===");
		return ResponseEntity.ok(CommonResponse.of(COMMON_SUCCESS, plantWalkResponse));
	}

	@GetMapping("/{plantId}/start-location")
	@Operation(summary = "현재 위치 조회", description = "현재 산책 중인 위치를 조회합니다.")
	public ResponseEntity<CommonResponse> getCurrentLocation(@PathVariable("plantId") Integer plantId) {
		log.info("===현재 위치 조회 START===");
		PlantLocation currentLocation = plantService.getStartWalkLocation(plantId);
		log.info("===현재 위치 조회 END===");
		return ResponseEntity.ok(CommonResponse.of(ResponseCode.COMMON_SUCCESS, currentLocation));
	}

}
