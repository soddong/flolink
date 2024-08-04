package com.flolink.backend.domain.user.dto.request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class StatusMessageRequest {
    private String statusMessage;

}
