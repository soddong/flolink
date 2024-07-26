package com.flolink.backend.global.common;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ResponseCode {

	COMMON_SUCCESS(200, "", "SUCCESS"),
	ROOM_ALREADY_ENTERED(200, "Room already entered", "SUCCESS"),
	NOT_FOUND_ERROR(404, "Resource not found", "NOT_FOUND_ERROR"),
	USER_NOT_FOUND(404, "User not found", "NOT_FOUND_ERROR"),
	ROOM_NOT_FOUND(404, "Room not found", "NOT_FOUND_ERROR"),
	ITEM_NOT_FOUND(404, "Item not found", "NOT_FOUND_ERROR"),

	BLANK_ROOM_NAME(400, "Blank room name", "BAD_REQUEST_ERROR"),
	INSUFFICIENT_FUNDS(402, "Insufficient funds", "INSUFFICIENT_FUNDS"),

	//Auth
	TIME_OUT_EXCEPTION(401, "Auth Time Out", "TIME_OUT_ERROR")

	;

	private final int status;
	private final String message;
	private final String code;
}
