package com.flolink.backend.domain.plant.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/plant")
@RequiredArgsConstructor
@Tag(name = "Plant API", description = "애완식물과 관련된 API")
public class PlantController {

}
