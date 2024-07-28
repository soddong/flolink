package com.flolink.backend.domain.user.controller;

import com.flolink.backend.domain.user.service.ReissueService;
import com.flolink.backend.global.common.CommonResponse;
import com.flolink.backend.global.common.ResponseCode;
import com.flolink.backend.global.util.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
public class ReissueController {

    private final JwtUtil jwtUtil;
    private final ReissueService reissueService;

    @PostMapping("/reissue")
    public ResponseEntity<?> reissue(HttpServletRequest request, HttpServletResponse response) {
        log.info("===AccessToken 재발급 START===");
        reissueService.reissue(request, response);
        log.info("===AccessToken 재발급 END===");
        return ResponseEntity.ok(CommonResponse.of(ResponseCode.COMMON_SUCCESS));
    }
}
