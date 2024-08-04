package com.flolink.backend.domain.calendar.dto.request;

import com.flolink.backend.domain.calendar.entity.enumType.TagType;
import lombok.Builder;
import lombok.Data;

import java.sql.Date;

@Data
@Builder
public class UpdateCalendarRequest {
    private int calendarId;
    private int roomId;
    private String title;
    private Date date;
    private String content;
    private TagType tag;
}
