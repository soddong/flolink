package com.flolink.backend.domain.observer.service;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

import com.flolink.backend.domain.observer.event.ExpUpdateEvent;
import com.flolink.backend.domain.plant.entity.enumtype.ActivityPointType;

@Service
public class ActivityService {
	private final ApplicationEventPublisher publisher;

	public ActivityService(ApplicationEventPublisher publisher) {
		this.publisher = publisher;
	}

	public void performActivity(Integer userId, Integer roomId, Integer userRoomId, ActivityPointType type) {
		ExpUpdateEvent event = new ExpUpdateEvent(this, userId, roomId, userRoomId, type);
		publisher.publishEvent(event);
	}
}
