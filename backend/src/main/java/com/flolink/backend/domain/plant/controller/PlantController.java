package com.flolink.backend.domain.plant.controller;

import java.time.Year;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.flolink.backend.domain.plant.dto.response.PlantHistorySummaryResponse;
import com.flolink.backend.domain.plant.service.PlantHistoryService;
import com.flolink.backend.global.common.CommonResponse;
import com.flolink.backend.global.common.ResponseCode;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/plant")
@RequiredArgsConstructor
@Tag(name = "Plant API", description = "기억정원과 관련된 API")
public class PlantController {

	private final PlantHistoryService plantHistoryService;

	@GetMapping("/{plantId}/historys")
	@Operation(summary = "기억정원 추억 리스트 불러오기", description = "연 단위 조회 (조회하고 싶은 연도 입력필요)")
	public ResponseEntity<?> getPlantHistorys(@PathVariable("plantId") final Integer plantId,
		@RequestParam(name = "year", required = false) final Integer year) {
		log.info("===기억정원 추억 리스트 불러오기 START===");
		int currentYear = (year != null) ? year : Year.now().getValue();
		PlantHistorySummaryResponse plantHistorys = plantHistoryService.getPlantHistorys(plantId, currentYear);
		log.info("===기억정원 추억 리스트 불러오기 END===");
		return ResponseEntity.ok(CommonResponse.of(ResponseCode.COMMON_SUCCESS, plantHistorys));
	}

	// @GetMapping("/{plantId}/historys/{historyId}")
	// @Operation(summary = "기억정원 추억 불러오기", description = "특정달의 추억 조회")
	// public ResponseEntity<?> getPlantHistoryDetail(@PathVariable("plantId") final Integer plantId,
	// 	@PathVariable("historyId") final Integer historyId) {
	// 	log.info("===기억정원 추억 불러오기 START===");
	// 	// 유저별 랭킹
	// 	Integer userId = 1;
	//
	// 	log.info("===기억정원 추억 불러오기 END===");
	// 	return ResponseEntity.ok(CommonResponse.of(ResponseCode.COMMON_SUCCESS, plantHistorys));
	// }

}
