package com.flolink.backend.global.util;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;

public class DateTimeUtil {

	public static LocalDateTime atStartOfDay(String dateMonth) {
		LocalDate date = LocalDate.parse(dateMonth + "-01", DateTimeFormatter.ofPattern("yyyy-MM-dd"));
		return date.atStartOfDay();
	}

	public static LocalDateTime atEndOfDay(String dateMonth) {
		YearMonth yearMonth = YearMonth.parse(dateMonth, DateTimeFormatter.ofPattern("yyyy-MM"));
		LocalDate lastDayOfMonth = yearMonth.atEndOfMonth();
		return lastDayOfMonth.atTime(23, 59, 59, 999999999);
	}

	public static String formatDateMonth(LocalDate date) {
		return date.format(DateTimeFormatter.ofPattern("yyyy-MM"));
	}

}
