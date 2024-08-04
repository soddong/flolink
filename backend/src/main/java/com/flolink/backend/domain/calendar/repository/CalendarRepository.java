package com.flolink.backend.domain.calendar.repository;

import com.flolink.backend.domain.calendar.dto.response.CalendarResponse;
import com.flolink.backend.domain.calendar.entity.Calendar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface CalendarRepository extends JpaRepository<Calendar, Integer> {

    @Query("SELECT c FROM Calendar c WHERE FUNCTION('YEAR', c.date) = FUNCTION('YEAR', :date) " +
            "AND FUNCTION('MONTH', c.date) = FUNCTION('MONTH', :date) " +
            "AND FUNCTION('DAY', c.date) = FUNCTION('DAY', :date) " +
            "AND c.room.roomId = :roomId " +
            "ORDER BY c.createAt ASC")
    List<CalendarResponse> findByDateAndRoomId(@Param("date") Date date, @Param("roomId") Integer roomId);


}
