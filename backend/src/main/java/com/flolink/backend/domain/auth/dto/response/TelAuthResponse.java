package com.flolink.backend.domain.auth.dto.response;

import com.flolink.backend.domain.auth.entity.Auth;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class TelAuthResponse {
    private String tel;
    private String authNum;
    private String expiredAt;

    public TelAuthResponse() {}


    public Auth toEntity(String tel, String authNum){
        return Auth.builder()
                .tel(tel)
                .authNum(authNum)
                .expiredAt(LocalDateTime.now().plusMinutes(5))
                .build();
    }
}
