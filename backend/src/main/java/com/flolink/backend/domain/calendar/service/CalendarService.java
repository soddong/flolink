package com.flolink.backend.domain.calendar.service;

import java.util.List;

import com.flolink.backend.domain.calendar.dto.request.CalendarRequest;
import com.flolink.backend.domain.calendar.dto.request.DateCalendarRequest;
import com.flolink.backend.domain.calendar.dto.request.DeleteCalendarRequest;
import com.flolink.backend.domain.calendar.dto.request.UpdateCalendarRequest;
import com.flolink.backend.domain.calendar.dto.response.CalendarResponse;
import com.flolink.backend.domain.user.dto.response.CustomUserDetails;

public interface CalendarService {
	List<CalendarResponse> getList(DateCalendarRequest dateCalendarRequest, Integer roomId,
		CustomUserDetails customUserDetails);

	void addCalendar(Integer userId, CalendarRequest calendarRequest);

	void removeCalendar(DeleteCalendarRequest deleteCalendarRequest, Integer userId);

	void modifyCalendar(UpdateCalendarRequest updateCalendarRequest, Integer userId);
}
