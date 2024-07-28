package com.flolink.backend.domain.store.service;

import java.util.List;

import com.flolink.backend.domain.store.dto.response.ItemPurchaseResponse;
import com.flolink.backend.domain.store.dto.response.ItemResponse;
import com.flolink.backend.domain.store.entity.Item;
import com.flolink.backend.domain.store.entity.ItemPurchase;
import com.flolink.backend.domain.user.entity.User;

public interface ItemService {

	ItemResponse saveItem(final Item item);

	List<ItemResponse> getAllItems();

	ItemResponse getItemById(final Integer itemId);

	void deleteItem(final Integer itemId);

	ItemPurchaseResponse purchaseItem(final Integer userId, final Integer itemId);

	List<ItemPurchaseResponse> getPurchaseHistory(final Integer userId);

	ItemPurchase savePurchaseHistory(User user, Item item);

	void processUserPurchase(User user, Item item);

}
