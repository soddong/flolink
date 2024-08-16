package com.flolink.backend.domain.room.entity;

import java.time.LocalDateTime;
import java.util.List;

import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import com.flolink.backend.domain.calendar.entity.Calendar;
import com.flolink.backend.domain.plant.entity.Plant;
import com.flolink.backend.domain.room.dto.request.RoomUpdateRequest;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
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
@Table(name = "room")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@SQLDelete(sql = "UPDATE room SET use_yn = false WHERE room_id = ?")
@SQLRestriction("use_yn = true")
public class Room {

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "room", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<UserRoom> userRoomList;
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "room", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Calendar> calendars;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "room_id")
	private Integer roomId;
	@Column(name = "room_name", nullable = false, length = 100)
	private String roomName;
	@Column(name = "create_at", nullable = false)
	private LocalDateTime createAt;
	@Column(name = "use_yn", nullable = false)
	private Boolean useYn;
	@Column(name = "room_participate_password", nullable = false)
	private String roomParticipatePassword;
	@Column(name = "notice", length = 255)
	private String notice;
	@OneToOne(mappedBy = "room", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
	private Plant plant;

	@Override
	public boolean equals(final Object obj) {
		if (obj instanceof Room target) {
			return roomId.equals(target.getRoomId());
		}
		return super.equals(obj);
	}

	public void updateRoomInfo(final RoomUpdateRequest roomUpdateRequest) {
		this.roomName = roomUpdateRequest.getRoomName();
		this.roomParticipatePassword = roomUpdateRequest.getRoomParticipatePassword();
		this.notice = roomUpdateRequest.getNotice();
	}
}
