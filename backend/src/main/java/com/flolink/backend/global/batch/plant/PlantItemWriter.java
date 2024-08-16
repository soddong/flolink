package com.flolink.backend.global.batch.plant;

import org.springframework.batch.item.Chunk;
import org.springframework.batch.item.ItemWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.flolink.backend.domain.plant.entity.plantexp.PlantExpHistory;
import com.flolink.backend.domain.plant.repository.PlantExpHistoryRepository;

@Component
public class PlantItemWriter implements ItemWriter<PlantExpHistory> {

	@Autowired
	private PlantExpHistoryRepository plantExpHistoryRepository;

	@Override
	public void write(Chunk<? extends PlantExpHistory> items) {
		for (PlantExpHistory history : items) {
			plantExpHistoryRepository.save(history);
		}
	}
}
