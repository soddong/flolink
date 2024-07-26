package com.flolink.backend.global.common;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.flolink.backend.global.common.exception.BadRequestException;
import com.flolink.backend.global.common.exception.NotFoundException;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler(NotFoundException.class)
	public final ResponseEntity<CommonResponse> handleNotFoundException(NotFoundException ex) {
		ResponseCode errorCode = ex.getErrorCode();
		CommonResponse response = CommonResponse.builder()
			.code(errorCode.getCode())
			.status(errorCode.getStatus())
			.message(errorCode.getMessage())
			.build();
		return new ResponseEntity<>(response, HttpStatus.valueOf(errorCode.getStatus()));
	}

	@ExceptionHandler(BadRequestException.class)
	public final ResponseEntity<CommonResponse> handleBadRequestException(BadRequestException ex) {
		ResponseCode errorCode = ex.getErrorCode();
		CommonResponse response = CommonResponse.builder()
			.code(errorCode.getCode())
			.status(errorCode.getStatus())
			.message(errorCode.getMessage())
			.build();
		return new ResponseEntity<>(response, HttpStatus.valueOf(errorCode.getStatus()));
	}
}
