package com.flolink.backend.global.batch.calendar;

import java.time.LocalDate;
import java.util.List;

import org.springframework.batch.item.ItemReader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.flolink.backend.domain.calendar.entity.Calendar;
import com.flolink.backend.domain.calendar.repository.CalendarRepository;

import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class CalendarItemReader implements ItemReader<Calendar> {

	@Autowired
	private CalendarRepository calendarRepository;

	private List<Calendar> calendars;
	private int nextCalendarIndex;

	@Override
	public Calendar read() {
		log.info("============== Calendar read START ================");

		if (calendars == null) {
			calendars = calendarRepository.findCalendarsByDateAndUseYn(LocalDate.now());
			nextCalendarIndex = 0;
		}

		Calendar nextCalendar = null;

		if (nextCalendarIndex < calendars.size()) {
			nextCalendar = calendars.get(nextCalendarIndex);
			nextCalendarIndex++;
		}
		
		log.info("============== Calendar read START ================");
		return nextCalendar;
	}
}
