package com.flolink.backend.global.common.exception;

import com.flolink.backend.global.common.ResponseCode;

import lombok.Getter;

@Getter
public class NotFoundException extends RuntimeException {
	private ResponseCode errorCode;

	public NotFoundException(ResponseCode errorCode) {
		super(errorCode.getMessage());
		this.errorCode = errorCode;
	}
}
