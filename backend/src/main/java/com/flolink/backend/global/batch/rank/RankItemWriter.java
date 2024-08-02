package com.flolink.backend.global.batch.rank;

import org.springframework.batch.item.Chunk;
import org.springframework.batch.item.ItemWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.flolink.backend.domain.plant.entity.UserExpHistory;
import com.flolink.backend.domain.plant.repository.UserExpHistoryRepository;

@Component
public class RankItemWriter implements ItemWriter<UserExpHistory> {

	@Autowired
	private UserExpHistoryRepository userExpHistoryRepository;

	@Override
	public void write(Chunk<? extends UserExpHistory> items) throws Exception {
		userExpHistoryRepository.saveAll(items);
	}
}
