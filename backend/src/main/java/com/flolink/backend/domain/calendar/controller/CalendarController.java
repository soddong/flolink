package com.flolink.backend.domain.calendar.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.flolink.backend.domain.calendar.dto.request.CalendarRequest;
import com.flolink.backend.domain.calendar.dto.request.DateCalendarRequest;
import com.flolink.backend.domain.calendar.dto.request.DeleteCalendarRequest;
import com.flolink.backend.domain.calendar.dto.request.UpdateCalendarRequest;
import com.flolink.backend.domain.calendar.dto.response.CalendarResponse;
import com.flolink.backend.domain.calendar.service.CalendarService;
import com.flolink.backend.domain.user.dto.response.CustomUserDetails;
import com.flolink.backend.global.common.CommonResponse;
import com.flolink.backend.global.common.ResponseCode;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/calendar")
@RequiredArgsConstructor
@Tag(name = "Calendar API", description = "캘린더 관련 CRUD 구현")
public class CalendarController {

	private final CalendarService calendarService;

	@Operation(summary = "일정 반환", description = "선택한 년도, 월에 따른 일정을 반환한다.")
	@GetMapping("/list")
	public ResponseEntity<?> getCalendarList(@RequestBody DateCalendarRequest dateCalendarRequest,
		Authentication authentication) {
		CustomUserDetails customUserDetails = (CustomUserDetails)authentication.getPrincipal();
		log.info("===캘린더 일정 반환 START===");
		List<CalendarResponse> list = calendarService.getList(dateCalendarRequest,
			dateCalendarRequest.getRoomId(), customUserDetails);
		log.info("===캘린더 일정 반환 START===");
		return ResponseEntity.ok(CommonResponse.of(ResponseCode.COMMON_SUCCESS, list));
	}

	@Operation(summary = "일정 추가", description = "원하는 날짜에 일정을 추가한다.")
	@PostMapping("/add")
	public ResponseEntity<?> createCalendar(@RequestBody CalendarRequest calendarRequest) {
		log.info("===캘린더 일정 추가 START===");
		calendarService.addCalendar(calendarRequest);
		log.info("===캘린더 일정 추가 START===");
		return ResponseEntity.ok(CommonResponse.of(ResponseCode.COMMON_SUCCESS));
	}

	@Operation(summary = "일정 삭제", description = "해당 일정을 삭제한다. 같은 가족구성원이라면 삭제 가능")
	@DeleteMapping("/remove")
	public ResponseEntity<?> removeCalendar(@RequestBody DeleteCalendarRequest deleteCalendarRequest,
		Authentication authentication) {
		CustomUserDetails customUserDetails = (CustomUserDetails)authentication.getPrincipal();
		log.info("===캘린더 일정 삭제 START===");
		calendarService.removeCalendar(deleteCalendarRequest, customUserDetails.getUserId());
		log.info("===캘린더 일정 삭제 START===");
		return ResponseEntity.ok(CommonResponse.of(ResponseCode.COMMON_SUCCESS));
	}

	@Operation(summary = "일정 수정", description = "해당 일정을 수정한다. 같은 가족구성원이라면 수정 가능")
	@PatchMapping("/update")
	public ResponseEntity<?> updateCalendar(@RequestBody UpdateCalendarRequest updateCalendarRequest,
		Authentication authentication) {
		CustomUserDetails customUserDetails = (CustomUserDetails)authentication.getPrincipal();
		log.info("===캘린더 일정 수정 START===");
		calendarService.modifyCalendar(updateCalendarRequest, customUserDetails.getUserId());
		log.info("===캘린더 일정 수정 START===");
		return ResponseEntity.ok(CommonResponse.of(ResponseCode.COMMON_SUCCESS));
	}
}
