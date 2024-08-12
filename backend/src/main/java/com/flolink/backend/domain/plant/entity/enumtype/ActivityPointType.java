package com.flolink.backend.domain.plant.entity.enumtype;

import lombok.Getter;

@Getter
public enum ActivityPointType {
	ATTENDANCE(10),
	WALK(50),
	FEED(30),
	COMMENT(20);

	private final int point;

	ActivityPointType(int point) {
		this.point = point;
	}
}
