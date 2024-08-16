package com.flolink.backend.global.batch.rank;

import java.math.BigDecimal;

import org.jetbrains.annotations.NotNull;
import org.springframework.batch.item.Chunk;
import org.springframework.batch.item.ItemWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.flolink.backend.domain.plant.entity.plantexp.PlantUserExpHistory;
import com.flolink.backend.domain.plant.repository.PlantUserExpHistoryRepository;
import com.flolink.backend.domain.plant.service.plantexp.PlantExpUserService;
import com.flolink.backend.domain.user.entity.User;
import com.flolink.backend.domain.user.service.UserService;
import com.flolink.backend.global.auth.dto.response.OAuth.UserDTO;

import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class RankItemWriter implements ItemWriter<PlantUserExpHistory> {

	@Autowired
	private PlantUserExpHistoryRepository plantUserExpHistoryRepository;

	@Autowired
	private UserService userService;

	@Override
	public void write(@NotNull Chunk<? extends PlantUserExpHistory> histories) throws Exception {
		log.info("============== Plant User History Writer START =============");

		plantUserExpHistoryRepository.saveAll(histories);

		for (PlantUserExpHistory history : histories) {
			UserDTO userDTO = userService.findUserByUserId(history.getUserId());
			if (userDTO != null && history.getContributeExp() != 0) {
				System.out.println(userDTO.getUserId() + ", " + history.getContributeExp());
				userService.addPoint(userDTO.getUserId(), new BigDecimal(history.getContributeExp()));
			}
		}
		log.info("============== Plant User History Writer START =============");
	}
}
