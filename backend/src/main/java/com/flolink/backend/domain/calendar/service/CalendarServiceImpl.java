package com.flolink.backend.domain.calendar.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.flolink.backend.domain.calendar.dto.request.CalendarRequest;
import com.flolink.backend.domain.calendar.dto.request.DateCalendarRequest;
import com.flolink.backend.domain.calendar.dto.request.DeleteCalendarRequest;
import com.flolink.backend.domain.calendar.dto.request.UpdateCalendarRequest;
import com.flolink.backend.domain.calendar.dto.response.CalendarResponse;
import com.flolink.backend.domain.calendar.entity.Calendar;
import com.flolink.backend.domain.calendar.repository.CalendarRepository;
import com.flolink.backend.domain.room.entity.Room;
import com.flolink.backend.domain.room.entity.UserRoom;
import com.flolink.backend.domain.room.repository.RoomRepository;
import com.flolink.backend.domain.room.repository.UserRoomRepository;
import com.flolink.backend.domain.room.service.RoomService;
import com.flolink.backend.domain.user.dto.response.CustomUserDetails;
import com.flolink.backend.global.common.ResponseCode;
import com.flolink.backend.global.common.exception.NotFoundException;
import com.flolink.backend.global.common.exception.UnAuthorizedException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class CalendarServiceImpl implements CalendarService {

	private final RoomService roomService;
	private final UserRoomRepository userRoomRepository;
	private final CalendarRepository calendarRepository;
	private final RoomRepository roomRepository;

	@Override
	public List<CalendarResponse> getList(DateCalendarRequest dateCalendarRequest, Integer roomId,
		CustomUserDetails customUserDetails) {
		if (dateCalendarRequest.getRoomId() != roomId) {
			throw new UnAuthorizedException(ResponseCode.NOT_MATCH_ROOMID);
		}

		List<Calendar> list = calendarRepository.findByYearAndMonthAndRoomId(dateCalendarRequest.getYear(),
			dateCalendarRequest.getMonth(), roomId);

		return list.stream()
			.map(Calendar::toEntity)
			.collect(Collectors.toList());
	}

	@Override
	public void addCalendar(CalendarRequest calendarRequest) {
		Room room = roomRepository.findById(calendarRequest.getRoomId())
			.orElseThrow(() -> new NotFoundException(ResponseCode.NOT_MATCH_ROOMID));

		calendarRepository.save(Calendar.of(calendarRequest, room));
	}

	@Override
	public void removeCalendar(DeleteCalendarRequest deleteCalendarRequest, Integer userId) {

		//TODO 나중에 exist로 변경
		UserRoom userRoom = roomService.findUserRoomByUserIdAndRoomId(userId, deleteCalendarRequest.getRoomId());

		// 해당 캘린더 가져와서
		Calendar calendar = calendarRepository.findById(deleteCalendarRequest.getCalendarId())
			.orElseThrow(() -> new NotFoundException(ResponseCode.NOT_FOUND_ERROR));

		// 사용여부 변경
		calendar.setUseYn(false);
	}

	@Override
	public void modifyCalendar(UpdateCalendarRequest updateCalendarRequest, Integer userId) {

		//TODO 나중에 exist로 변경
		UserRoom userRoom = roomService.findUserRoomByUserIdAndRoomId(userId, updateCalendarRequest.getRoomId());
		// 해당 캘린더 가져와서
		Calendar calendar = calendarRepository.findById(updateCalendarRequest.getCalendarId())
			.orElseThrow(() -> new NotFoundException(ResponseCode.CALENDAR_NOT_FOUND));

		calendar.setTitle(updateCalendarRequest.getTitle());
		calendar.setDate(updateCalendarRequest.getDate());
		calendar.setContent(updateCalendarRequest.getContent());
		calendar.setTag(updateCalendarRequest.getTag());
	}
}
