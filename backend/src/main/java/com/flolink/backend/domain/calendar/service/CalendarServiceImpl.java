package com.flolink.backend.domain.calendar.service;

import com.flolink.backend.domain.calendar.dto.request.CalendarRequest;
import com.flolink.backend.domain.calendar.dto.response.CalendarResponse;
import com.flolink.backend.domain.calendar.entity.Calendar;
import com.flolink.backend.domain.calendar.repository.CalendarRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class CalendarServiceImpl implements CalendarService{

    private final CalendarRepository calendarRepository;

    @Override
    public List<CalendarResponse> getList(Date date, Integer myRoomId) {
        List<CalendarResponse> list = calendarRepository.findByDateAndRoomId(date, myRoomId);
        return list;
    }

    @Override
    public void addCalendar(CalendarRequest calendarRequest) {

    }


}
