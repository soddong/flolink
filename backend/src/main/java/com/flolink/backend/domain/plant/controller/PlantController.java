package com.flolink.backend.domain.plant.controller;

import java.time.Year;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
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
@Tag(name = "Plant API", description = "애완식물과 관련된 API")
public class PlantController {

	private final PlantHistoryService plantHistoryService;

	@GetMapping("/{plantId}/historys")
	@Operation(summary = "애완식물의 추억 리스트 불러오기", description = "연 단위 조회 (조회하고 싶은 연도 입력필요)")
	public ResponseEntity<?> getPlantHistorys(@RequestParam("plantId") final Integer plantId,
		@RequestParam(name = "year", required = false) final Integer year) {
		log.info("===추억 리스트 (연도단위) 불러오기 START===");
		final int currentYear = (year != null) ? year : Year.now().getValue();
		Integer userId = 1;
		PlantHistorySummaryResponse plantHistorys = plantHistoryService.getPlantHistorys(plantId, currentYear);
		log.info("===추억 리스트 (연도단위) 불러오기 END===");
		return ResponseEntity.ok(CommonResponse.of(ResponseCode.COMMON_SUCCESS, plantHistorys));
	}
}
