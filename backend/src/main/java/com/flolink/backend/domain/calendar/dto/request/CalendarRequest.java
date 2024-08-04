package com.flolink.backend.domain.calendar.dto.request;

import lombok.Data;

@Data
public class CalendarRequest {
    private String title;
    private String tag;
    private String Content;
}
