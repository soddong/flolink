package com.flolink.backend.global.common.exception;

import com.flolink.backend.global.common.ResponseCode;

import lombok.Getter;

@Getter
public class BadRequestException extends RuntimeException {
	private ResponseCode errorCode;

	public BadRequestException(final ResponseCode errorCode) {
		super(errorCode.getMessage());
		this.errorCode = errorCode;
	}
}
