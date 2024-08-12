package com.flolink.backend.global.batch.rank;

import java.util.Iterator;
import java.util.List;

import org.springframework.batch.item.ItemReader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.flolink.backend.domain.plant.entity.plantexp.PlantUserExp;
import com.flolink.backend.domain.plant.repository.PlantUserExpRepository;

@Component
public class RankItemReader implements ItemReader<PlantUserExp> {

	@Autowired
	private PlantUserExpRepository plantUserExpRepository;

	private Iterator<PlantUserExp> userExpIterator;

	@Override
	public PlantUserExp read() {
		if (userExpIterator == null) {
			List<PlantUserExp> plantUserExps = plantUserExpRepository.findAllGroupedByPlantOrderByContributeExpAsc();
			userExpIterator = plantUserExps.iterator();
		}

		if (userExpIterator != null && userExpIterator.hasNext()) {
			return userExpIterator.next();
		} else {
			return null;
		}
	}
}
