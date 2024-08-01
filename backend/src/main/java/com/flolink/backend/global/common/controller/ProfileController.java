package com.flolink.backend.global.common.controller;

import java.util.Arrays;
import java.util.List;

import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/profiles")
public class ProfileController {
	private final Environment env;

	@GetMapping
	public String getProfile() {
		final List<String> profiles = Arrays.asList("blue", "green");
		return Arrays.stream(env.getActiveProfiles()).filter(profiles::contains).findAny().orElse("blue");
	}
}
