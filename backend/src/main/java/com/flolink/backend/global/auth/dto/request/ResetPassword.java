package com.flolink.backend.global.auth.dto.request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ResetPassword {
    private String userName;
    private String loginId;
    private String tel;
    private String authNum;
}
