package com.flolink.backend.domain.calendar.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.flolink.backend.domain.calendar.entity.Calendar;

public interface CalendarRepository extends JpaRepository<Calendar, Integer> {

	@Query("SELECT c FROM Calendar c WHERE FUNCTION('YEAR', c.date) = :year "
		+ "AND FUNCTION('MONTH', c.date) = :month "
		+ "AND c.room.roomId = :roomId " +
		"ORDER BY c.createAt ASC")
	List<Calendar> findByYearAndMonthAndRoomId(@Param("year") Integer year, @Param("month") Integer month,
		@Param("roomId") Integer roomId);

}
