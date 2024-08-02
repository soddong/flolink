package com.flolink.backend.global.batch.rank;

import java.util.Iterator;
import java.util.List;

import org.springframework.batch.item.ItemReader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.flolink.backend.domain.plant.entity.UserExp;
import com.flolink.backend.domain.plant.repository.UserExpRepository;

@Component
public class RankItemReader implements ItemReader<UserExp> {

	@Autowired
	private UserExpRepository userExpRepository;

	private Iterator<UserExp> userExpIterator;

	@Override
	public UserExp read() {
		if (userExpIterator == null) {
			List<UserExp> userExps = userExpRepository.findAllGroupedByPlantOrderByContributeExpAsc();
			userExpIterator = userExps.iterator();
		}

		if (userExpIterator != null && userExpIterator.hasNext()) {
			return userExpIterator.next();
		} else {
			return null;
		}
	}
}
