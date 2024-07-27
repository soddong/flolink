package com.flolink.backend.global.common.exception;

import com.flolink.backend.global.common.ResponseCode;

import lombok.Getter;

@Getter
public class UnAuthorizedException extends RuntimeException {
	private final ResponseCode errorCode;

	public UnAuthorizedException(final ResponseCode errorCode) {
		super(errorCode.getMessage());
		this.errorCode = errorCode;
	}
}
