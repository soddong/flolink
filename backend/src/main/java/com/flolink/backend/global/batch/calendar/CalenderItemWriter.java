package com.flolink.backend.global.batch.calendar;

import java.time.LocalDateTime;

import org.springframework.batch.item.Chunk;
import org.springframework.batch.item.ItemWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.flolink.backend.domain.calendar.entity.Calendar;
import com.flolink.backend.domain.noti.entity.Noti;
import com.flolink.backend.domain.noti.repository.NotiRepository;
import com.flolink.backend.domain.room.entity.UserRoom;

@Component
public class CalenderItemWriter implements ItemWriter<Calendar> {

	@Autowired
	private NotiRepository notiRepository;

	@Override
	public void write(Chunk<? extends Calendar> calendars) {
		for (Calendar calendar : calendars) {
			for (UserRoom userRoom : calendar.getRoom().getUserRoomList()) {
				Noti noti = Noti.builder()
					.userRoom(userRoom)
					.message("오전 일정 알림")
					.createAt(LocalDateTime.now())
					.build();
				notiRepository.save(noti);	
			}
		}

	}
}
