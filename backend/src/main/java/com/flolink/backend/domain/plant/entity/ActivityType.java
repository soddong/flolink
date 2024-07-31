package com.flolink.backend.domain.plant.entity;

import lombok.Getter;

@Getter
public enum ActivityType {
	Attendance(10),
	WALK(50),
	FEED(30),
	COMMENT(20);

	private final int point;

	ActivityType(int point) {
		this.point = point;
	}
}
