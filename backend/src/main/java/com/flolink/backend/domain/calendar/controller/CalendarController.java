package com.flolink.backend.domain.calendar.controller;

import com.flolink.backend.domain.calendar.dto.request.CalendarRequest;
import com.flolink.backend.domain.calendar.dto.response.CalendarResponse;
import com.flolink.backend.domain.calendar.service.CalendarService;
import com.flolink.backend.domain.user.dto.response.CustomUserDetails;
import com.flolink.backend.global.common.CommonResponse;
import com.flolink.backend.global.common.ResponseCode;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/calendar")
@RequiredArgsConstructor
@Tag(name = "Calendar API", description = "캘린더 관련 CRUD 구현")
public class CalendarController {

    private final CalendarService calendarService;

    @Operation(summary = "일정 반환", description = "선택한 날짜에 따른 일정을 반환한다.")
    @GetMapping("/list/{date}")
    public ResponseEntity<?> getCalendarList(@PathVariable("date") Date date, Authentication authentication) {
        CustomUserDetails customUserDetails = (CustomUserDetails)authentication.getPrincipal();
        log.info("===캘린더 일정 반환 START===");
        List<CalendarResponse> list = calendarService.getList(date, customUserDetails.getMyRoomId());
        log.info("===캘린더 일정 반환 START===");
        return ResponseEntity.ok(CommonResponse.of(ResponseCode.COMMON_SUCCESS, list));
    }

    @Operation(summary = "일정 추가", description = "원하는 날짜에 일정을 추가한다.")
    @PostMapping("/list/add")
    public ResponseEntity<?> createCalendar(@RequestBody CalendarRequest calendarRequest){
        log.info("===캘린더 일정 추가 START===");
        calendarService.addCalendar(calendarRequest);
        log.info("===캘린더 일정 추가 START===");
        return ResponseEntity.ok(CommonResponse.of(ResponseCode.COMMON_SUCCESS));
    }
}
