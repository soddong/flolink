package com.flolink.backend.global.common.exception;

import com.flolink.backend.global.common.ResponseCode;

public class DuplicateException extends RuntimeException{
    private final ResponseCode errorCode;

    public DuplicateException(ResponseCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }
}
