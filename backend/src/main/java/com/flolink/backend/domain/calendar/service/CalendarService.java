package com.flolink.backend.domain.calendar.service;

import com.flolink.backend.domain.calendar.dto.request.CalendarRequest;
import com.flolink.backend.domain.calendar.dto.response.CalendarResponse;

import java.sql.Date;
import java.util.List;

public interface CalendarService {
    List<CalendarResponse> getList(Date date, Integer myRoomId);

    void addCalendar(CalendarRequest calendarRequest);
}
