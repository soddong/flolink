package com.flolink.backend.domain.item.service;

import java.util.List;

import com.flolink.backend.domain.item.dto.response.ItemResponse;
import com.flolink.backend.domain.item.entity.Item;

public interface ItemService {

	ItemResponse saveItem(Item item);

	List<ItemResponse> getAllItems();

	ItemResponse getItemById(int itemId);

	void deleteItem(int itemId);
	
}
