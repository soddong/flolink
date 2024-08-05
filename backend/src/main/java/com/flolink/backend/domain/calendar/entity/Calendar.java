package com.flolink.backend.domain.calendar.entity;

import java.sql.Date;
import java.time.LocalDateTime;

import org.hibernate.annotations.SQLRestriction;

import com.flolink.backend.domain.calendar.dto.request.CalendarRequest;
import com.flolink.backend.domain.calendar.dto.response.CalendarResponse;
import com.flolink.backend.domain.calendar.entity.enumType.TagType;
import com.flolink.backend.domain.room.entity.Room;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@Builder
@Table(name = "calendar")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@SQLRestriction("use_yn = true")
public class Calendar {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "calendar_id")
	private int calendarId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "room_id", nullable = false)
	private Room room;

	@Column(name = "title", nullable = false, length = 256)
	private String title;

	@Column(name = "date", nullable = false)
	private Date date;

	@Column(name = "content", nullable = false, length = 256)
	private String content;

	@Column(name = "tag")
	@Enumerated(EnumType.STRING)
	private TagType tag;

	@Builder.Default
	@Column(name = "create_at")
	private LocalDateTime createAt = LocalDateTime.now();

	@Builder.Default
	@Column(name = "use_yn")
	private boolean useYn = true;

	public CalendarResponse toEntity() {
		return CalendarResponse.builder()
			.calendarId(this.calendarId)
			.title(this.title)
			.date(this.date)
			.content(this.content)
			.tag(this.tag)
			.build();
	}

	public static Calendar of(CalendarRequest calendarRequest, Room room) {
		return Calendar.builder()
			.room(room)
			.title(calendarRequest.getTitle())
			.date(calendarRequest.getDate())
			.content(calendarRequest.getContent())
			.tag(calendarRequest.getTag())
			.build();
	}
}
