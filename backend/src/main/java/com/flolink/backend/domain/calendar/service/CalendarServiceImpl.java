package com.flolink.backend.domain.calendar.service;

import java.sql.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.flolink.backend.domain.calendar.dto.request.CalendarRequest;
import com.flolink.backend.domain.calendar.dto.request.DeleteCalendarRequest;
import com.flolink.backend.domain.calendar.dto.request.UpdateCalendarRequest;
import com.flolink.backend.domain.calendar.dto.response.CalendarResponse;
import com.flolink.backend.domain.calendar.entity.Calendar;
import com.flolink.backend.domain.calendar.repository.CalendarRepository;
import com.flolink.backend.domain.room.entity.Room;
import com.flolink.backend.domain.room.entity.UserRoom;
import com.flolink.backend.domain.room.repository.RoomRepository;
import com.flolink.backend.domain.room.repository.UserRoomRepository;
import com.flolink.backend.global.common.ResponseCode;
import com.flolink.backend.global.common.exception.NotFoundException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class CalendarServiceImpl implements CalendarService {

	private final UserRoomRepository userRoomRepository;
	private final CalendarRepository calendarRepository;
	private final RoomRepository roomRepository;

	@Override
	public List<CalendarResponse> getList(Date date, int roomId, int userId) {
		UserRoom userRoom = userRoomRepository.findByUserUserIdAndRoomRoomId(userId, roomId);
		if (userRoom == null) {
			throw new NotFoundException(ResponseCode.NOT_FOUND_ERROR);
		}
		List<Calendar> list = calendarRepository.findByDateAndRoomId(date, roomId);

		return list.stream()
			.map(Calendar::toEntity)
			.collect(Collectors.toList());
	}

	@Override
	public void addCalendar(CalendarRequest calendarRequest) {
		Room room = roomRepository.findById(calendarRequest.getRoomId()).get();

		calendarRepository.save(Calendar.of(calendarRequest, room));
	}

	@Override
	public void removeCalendar(DeleteCalendarRequest deleteCalendarRequest, int userId) {
		UserRoom userRoom = userRoomRepository.findByUserUserIdAndRoomRoomId(userId, deleteCalendarRequest.getRoomId());

		// userRoom에 메핑되어있지 않은 인원이라면 가족구성원 아님
		if (userRoom == null) {
			throw new NotFoundException(ResponseCode.NOT_FOUND_ERROR);
		}

		// 해당 캘린더 가져와서
		Calendar calendar = calendarRepository.findById(deleteCalendarRequest.getCalendarId())
			.orElseThrow(() -> new NotFoundException(ResponseCode.NOT_FOUND_ERROR));

		// 사용여부 변경
		calendar.setUseYn(false);
	}

	@Override
	public void modifyCalendar(UpdateCalendarRequest updateCalendarRequest, int userId) {
		UserRoom userRoom = userRoomRepository.findByUserUserIdAndRoomRoomId(userId, updateCalendarRequest.getRoomId());

		// userRoom에 메핑되어있지 않은 인원이라면 가족구성원 아님
		if (userRoom == null) {
			throw new NotFoundException(ResponseCode.NOT_FOUND_ERROR);
		}

		// 해당 캘린더 가져와서
		Calendar calendar = calendarRepository.findById(updateCalendarRequest.getCalendarId())
			.orElseThrow(() -> new NotFoundException(ResponseCode.NOT_FOUND_ERROR));

		calendar.setTitle(updateCalendarRequest.getTitle());
		calendar.setDate(updateCalendarRequest.getDate());
		calendar.setContent(updateCalendarRequest.getContent());
		calendar.setTag(updateCalendarRequest.getTag());
	}
}
