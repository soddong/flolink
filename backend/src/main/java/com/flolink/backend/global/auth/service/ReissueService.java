package com.flolink.backend.global.auth.service;

import com.fasterxml.jackson.core.JsonProcessingException;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public interface ReissueService {

	void reissue(HttpServletRequest request, HttpServletResponse response) throws JsonProcessingException;
}
