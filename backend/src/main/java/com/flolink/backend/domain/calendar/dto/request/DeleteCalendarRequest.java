package com.flolink.backend.domain.calendar.dto.request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DeleteCalendarRequest {
    private int calendarId;
    private int roomId;
}
