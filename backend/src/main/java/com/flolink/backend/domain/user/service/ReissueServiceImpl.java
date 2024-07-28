package com.flolink.backend.domain.user.service;

import com.flolink.backend.global.common.ResponseCode;
import com.flolink.backend.global.common.exception.UnAuthorizedException;
import com.flolink.backend.global.util.JwtUtil;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class ReissueServiceImpl implements ReissueService {

    private final JwtUtil jwtUtil;
    private final long accessTokenValidityInSeconds = 60*60*10L;

    @Override
    public void reissue(HttpServletRequest request, HttpServletResponse response) {
        String refresh = null;

        // cookie를 모두 꺼내서 refresh라는 이름이 있는지 확인. 있다면 refresh변수에 저장한다.
        Cookie[] cookies = request.getCookies();
        for (Cookie cookie : cookies) {
            if (cookie.getName().equals("refresh")) {
                refresh = cookie.getValue();
            }
        }

        if (refresh == null) {
            //refreshToken 이 존재하지 않습니다.
            throw new UnAuthorizedException(ResponseCode.NO_REFRESHTOKEN);
        }

        //expired check
        try {
            jwtUtil.isExpired(refresh);
        } catch (ExpiredJwtException e) {
            //refreshToken 이 만료되었습니다.
            throw new UnAuthorizedException(ResponseCode.EXPIRED_TOKEN);
        }

        // 토큰이 refresh인지 확인 (발급시 페이로드에 명시)
        String category = jwtUtil.getCategory(refresh);

        if (!category.equals("refresh")) {
            //refreshToken 이 아닙니다.
            throw new UnAuthorizedException(ResponseCode.INVALID_REFRESHTOKEN);
        }

        String loginId = jwtUtil.getLoginId(refresh);
        int myRoomId = jwtUtil.getMyRoomId(refresh);

        //make new JWT
        String newAccess = jwtUtil.createJwt("access", loginId, myRoomId, accessTokenValidityInSeconds);

        //response
        response.setHeader("access", newAccess);
    }
}
