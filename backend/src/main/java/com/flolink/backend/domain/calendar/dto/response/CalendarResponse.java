package com.flolink.backend.domain.calendar.dto.response;

import com.flolink.backend.domain.calendar.entity.enumType.TagType;
import lombok.Builder;
import lombok.Data;

import java.sql.Date;

@Data
@Builder
public class CalendarResponse {

    private int calendarId;
    private String title;
    private Date date;
    private String content;
    private TagType tag;
}
