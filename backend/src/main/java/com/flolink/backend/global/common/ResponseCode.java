package com.flolink.backend.global.common;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ResponseCode {

	COMMON_SUCCESS(200, "", "SUCCESS"),
	NOT_FOUND_ERROR(404, "Resource not found", "NOT_FOUND_ERROR");

	private final int status;
	private final String message;
	private final String code;
}
