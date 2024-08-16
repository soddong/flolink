package com.flolink.backend.domain.calendar.dto.request;

import com.flolink.backend.domain.calendar.entity.enumType.TagType;
import lombok.Data;

import java.sql.Date;

@Data
public class CalendarRequest {
    private int roomId;
    private String title;
    private TagType tag;
    private Date date;
    private String Content;
}
