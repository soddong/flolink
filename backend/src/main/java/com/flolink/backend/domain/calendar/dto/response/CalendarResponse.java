package com.flolink.backend.domain.calendar.dto.response;

import com.flolink.backend.domain.calendar.entity.enumType.ColorType;
import com.flolink.backend.domain.calendar.entity.enumType.IconType;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class CalendarResponse {

    private int calendarId;
    private IconType icon;
    private ColorType color;
    private String title;
    private LocalDateTime date;
    private String content;
    private String tag;
}
