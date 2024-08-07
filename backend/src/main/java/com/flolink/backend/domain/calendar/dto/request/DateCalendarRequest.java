package com.flolink.backend.domain.calendar.dto.request;

import lombok.Data;

@Data
public class DateCalendarRequest {
	private int roomId;
	private int year;
	private int month;
}
