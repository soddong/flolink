package com.flolink.backend.global.common;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ResponseCode {

	COMMON_SUCCESS(200, "", "SUCCESS"),

	// Common
	NOT_FOUND_ERROR(404, "Not Found", "NOT_FOUND_ERROR"),

	// User
	USER_NOT_FOUND(404, "User not found", "NOT_FOUND_ERROR"),
	UNREGISTERED_USER(401, "Unregistered User", "UNREGISTERED_USER"),
	BLANK_NICKNAME(404, "Cannot make the nickname due to a blank space.", "BLANK_NICKNAME"),
	UNAUTHORIZED_USER(401, "Unauthorized_User", "UNAUTHORIZED_USER"),

	// Room
	ROOM_ALREADY_ENTERED(200, "Room already entered", "SUCCESS"),
	USER_ROOM_NOT_FOUND(404, "UserRoom not found", "NOT_FOUND_ERROR"),
	BLANK_ROOM_NAME(400, "Blank room name", "BAD_REQUEST_ERROR"),
	USER_ROLE_NOT_FOUND(404, "User role not found", "NOT_FOUND_ERROR"),
	WRONG_PARTICIPATION_PASSWORD(401, "Wrong participation password", "NOT_AUTHORIZED"),
	NOT_AUTHORIZED(401, "Not authorized", "NOT_AUTHORIZED"),
	ROOM_NOT_FOUND(404, "Room not found", "NOT_FOUND_ERROR"),
	BLANK_ROOM_UPDATE_REQUEST(404, "Blank room update request", "BLANK_ROOM_UPDATE_REQUEST"),

	// Feed
	FEED_UPLOAD_FAILED(500, "Feed upload failed", "FEED_UPLOAD_FAILED"),
	COMMENT_NOT_FOUND(404, "Comment not found", "COMMENT_NOT_FOUND"),
	FEED_COMMENT_BAD_REQUEST(400, "Feed comment bad request", "FEEDCOMMENT_BAD_REQUEST"),

	// Plant
	PLANT_NOT_FOUND(404, "Plant not found", "NOT_FOUND_ERROR"),
	DAILY_LIMIT_EXCEEDED(400, "Daily limit exceed", "BAD_REQUEST_ERROR"),
	USER_EXP_NOT_FOUND(404, "User exp not found", "NOT_FOUND_ERROR"),
	PLANT_ALREADY_COMPLETED(400, "Plant already completed", "BAD_REQUEST_ERROR"),
	PLANT_HISTORY_NOT_FOUND(404, "Plant history not found", "NOT_FOUND_ERROR"),

	// Plant Walk
	PLANT_WALK_NOT_FOUND(404, "Plant walk not found", "NOT_FOUND_ERROR"),
	PLANT_IS_WALKING_BY_OTHER(400, "Plant is walking by other member", "PLANT_IS_WALKING_ERROR"),
	PLANT_NOT_WALKING(400, "Plant is not walking", "PLANT_NOT_WALKING_ERROR"),
	ABNORMAL_MOVEMENT(400, "Walking is not normal", "ABNORMAL_MOVEMENT_ERROR"),

	//Auth
	TIME_OUT_EXCEPTION(401, "Auth Time Out", "TIME_OUT_ERROR"),
	DUPLICATE_LOGIN_ID(401, "Duplicate login id", "DUPLICATE_LOGIN_ID"),
	EXPIRED_TOKEN(401, "Token has Expired", "EXPIRED_TOKEN"),
	UNAUTHORIZED_TOKEN(401, "Unauthorized Token", "UNAUTHORIZED_TOKEN"),
	NO_REFRESHTOKEN(401, "No Refresh Token", "NO_REFRESHTOKEN"),
	INVALID_REFRESHTOKEN(401, "Invalid Refresh Token", "INVALID_REFRESHTOKEN"),
	PASSWORD_INCONSISTENCY(401, "Password inconsistency", "PASSWORD_INCONSISTENCY"),
	USER_INCONSISTENCY(401, "User inconsistency", "USER_INCONSISTENCY"),
	NOT_FOUND_SUCCESSTOKEN(404, "Not Found Success Token", "NOT_FOUND_ERROR"),
	NOT_MATCH_TOKEN(401, "The token entered does not match the DB.", "NOT_MATCH_TOKEN"),
	NOT_MATCH_TEL(401, "The Telephone Number entered does not match the DB.", "NOT_MATCH_TOKEN"),
	NOT_MATCH_NAME(401, "The Username entered does not match the DB.", "NOT_MATCH_TOKEN"),
	NOT_MATCH_LOGINID(401, "The LoginId entered does not match the DB.", "NOT_MATCH_TOKEN"),
	UNAUTHORIZED_USER_ROLE(401, "OAuth login users cannot change their passwords.", "UNAUTHORIZED_USER_ROLE"),
	NOT_MATCH_ROOMID(401, "The RoomId entered does not match the DB.", "NOT_MATCH_TOKEN"),
	NOT_FOUND_AUTHNUM(401, "The AuthNum does not match the DB.", "NOT_FOUND_AUTHNUM"),
	NOT_MATCH_AUTHNUM(401, "The AuthNum entered does not match the DB.", "NOT_MATCH_AUTHNUM"),

	//Calendar
	CALENDAR_NOT_FOUND(401, "Calendar not found", "CALENDAR_NOT_FOUND"),

	// Purchase & Payment
	ITEM_ALREADY_PURCHASE(400, "Item already purchased", "ITEM_ALREADY_PURCHASE_ERROR"),
	INSUFFICIENT_FUNDS(400, "Insufficient funds", "ITEM_INSUFFICIENT_FUNDS_ERROR"),
	PAYMENT_BANK_FAILED(400, "Bank error", "PAYMENT_ERROR"),
	PAYMENT_AMOUNT_MISMATCH(400, "Amount mismatch", "PAYMENT_ERROR"),
	PAYMENT_NOT_FOUND(404, "Payment not found", "NOT_FOUND_ERROR"),

	// MyRoom & Item
	INVALID_ITEM_TYPE(400, "Invalid item type", "INVALID_ITEM_TYPE_ERROR"),
	ITEM_NOT_IN_INVENTORY(400, "Item not in inventory", "ITEM_NOT_IN_INVENTORY_ERROR"),
	ITEM_NOT_FOUND(404, "Item not found", "NOT_FOUND_ERROR"),
	MY_ROOM_NOT_FOUND(404, "MY ROOM not found", "NOT_FOUND_ERROR"),
	INVENTORY_NOT_FOUND(404, "Inventory not found", "NOT_FOUND_ERROR"),
	;

	private final int status;
	private final String message;
	private final String code;
}
