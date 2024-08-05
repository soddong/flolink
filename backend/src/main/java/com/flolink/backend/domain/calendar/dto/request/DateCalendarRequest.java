package com.flolink.backend.domain.calendar.dto.request;

import java.sql.Date;

import lombok.Data;

@Data
public class DateCalendarRequest {
	private Date date;
	private int roomId;
}
