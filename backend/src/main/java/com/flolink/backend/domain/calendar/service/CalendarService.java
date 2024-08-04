package com.flolink.backend.domain.calendar.service;

import com.flolink.backend.domain.calendar.dto.request.CalendarRequest;
import com.flolink.backend.domain.calendar.dto.request.DeleteCalendarRequest;
import com.flolink.backend.domain.calendar.dto.request.UpdateCalendarRequest;
import com.flolink.backend.domain.calendar.dto.response.CalendarResponse;

import java.sql.Date;
import java.util.List;

public interface CalendarService {
    List<CalendarResponse> getList(Date date, int roomId, int userId);

    void addCalendar(CalendarRequest calendarRequest);

    void removeCalendar(DeleteCalendarRequest deleteCalendarRequest, int userId);

    void modifyCalendar(UpdateCalendarRequest updateCalendarRequest, int userId);
}
