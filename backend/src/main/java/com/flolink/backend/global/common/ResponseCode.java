package com.flolink.backend.global.common;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ResponseCode {

	COMMON_SUCCESS(200, "", "SUCCESS"),
	ROOM_ALREADY_ENTERED(200, "Room already entered", "SUCCESS"),

	// Common
	NOT_FOUND_ERROR(404, "Not Found", "NOT_FOUND_ERROR"),

	// User
	USER_NOT_FOUND(404, "User not found", "NOT_FOUND_ERROR"),

	// Room
	USER_ROOM_NOT_FOUND(404, "UserRoom not found", "NOT_FOUND_ERROR"),
	BLANK_ROOM_NAME(400, "Blank room name", "BAD_REQUEST_ERROR"),
	USER_ROLE_NOT_FOUND(404, "User role not found", "NOT_FOUND_ERROR"),
	NOT_AUTHORIZED(401, "Not authorized", "NOT_AUTHORIZED"),
	ROOM_NOT_FOUND(404, "Room not found", "NOT_FOUND_ERROR"),

	//Auth
	TIME_OUT_EXCEPTION(401, "Auth Time Out", "TIME_OUT_ERROR"),
    DUPLICATE_LOGIN_ID(401, "Duplicate login id", "DUPLICATE_LOGIN_ID"),
	EXPIRED_TOKEN(401, "Token has Expired", "EXPIRED_TOKEN"),
	UNAUTHORIZED_TOKEN(401, "Unauthorized Token", "UNAUTHORIZED_TOKEN"),
	NO_REFRESHTOKEN(401, "No Refresh Token", "NO_REFRESHTOKEN"),
	INVALID_REFRESHTOKEN(401, "Invalid Refresh Token", "INVALID_REFRESHTOKEN"),

			// Purchase & Payment
	ITEM_ALREADY_PURCHASE(400, "Item already purchased", "BAD_REQUEST_ERROR"),
	INSUFFICIENT_FUNDS(400, "Insufficient funds", "ITEM_PURCHASE_ERROR"),
	PAYMENT_BANK_FAILED(400, "Bank error", "PAYMENT_ERROR"),
	PAYMENT_AMOUNT_MISMATCH(400, "Amount mismatch", "PAYMENT_ERROR"),
	PAYMENT_NOT_FOUND(404, "Payment not found", "NOT_FOUND_ERROR"),

	// MyRoom & Item
	INVALID_ITEM_TYPE(400, "Invalid item type", "BAD_REQUEST_ERROR"),
	ITEM_NOT_IN_INVENTORY(400, "Item not in inventory", "BAD_REQUEST_ERROR"),
	ITEM_NOT_FOUND(404, "Item not found", "NOT_FOUND_ERROR"),
	MY_ROOM_NOT_FOUND(404, "MY ROOM not found", "NOT_FOUND_ERROR"),
	INVENTORY_NOT_FOUND(404, "Inventory not found", "NOT_FOUND_ERROR"),
	;

	private final int status;
	private final String message;
	private final String code;
}
