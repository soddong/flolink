package com.flolink.backend.global.common.exception;

import com.flolink.backend.global.common.ResponseCode;

import lombok.Getter;

@Getter
public class TimeOutException extends RuntimeException {
	private ResponseCode responseCode;

	public TimeOutException(ResponseCode responseCode) {
		super(responseCode.getMessage());
		this.responseCode = responseCode;
	}
}
