package com.flolink.backend.domain.observer.event;

import com.flolink.backend.domain.plant.entity.enumtype.ActivityPointType;
import org.springframework.context.ApplicationEvent;

import lombok.Getter;

@Getter
public class ExpUpdateEvent extends ApplicationEvent {
	private final Integer userId;
	private final Integer roomId;
	private final Integer userRoomId;
	private final ActivityPointType type;

	public ExpUpdateEvent(Object source, Integer userId, Integer roomId, Integer userRoomId, ActivityPointType type) {
		super(source);
		this.userId = userId;
		this.roomId = roomId;
		this.userRoomId = userRoomId;
		this.type = type;
	}
}
