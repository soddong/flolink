package com.flolink.backend.global.common;

import lombok.Getter;

@Getter
public class CommonResponse {

	private final int status;
	private final String message;
	private final String code;
	private final Object data;

	public CommonResponse(final ResponseCode responseCode, final Object data) {
		this.status = responseCode.getStatus();
		this.message = responseCode.getMessage();
		this.code = responseCode.getCode();
		this.data = data;
	}

	public static CommonResponse of(final ResponseCode responseCode, final Object data) {
		return new CommonResponse(responseCode, data);
	}

	public static CommonResponse of(final ResponseCode responseCode) {
		return new CommonResponse(responseCode, "");
	}

}
