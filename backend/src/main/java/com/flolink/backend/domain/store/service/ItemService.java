package com.flolink.backend.domain.store.service;

import java.util.List;

import com.flolink.backend.domain.store.dto.response.ItemCommonResponse;
import com.flolink.backend.domain.store.dto.response.ItemPurchaseResponse;
import com.flolink.backend.domain.store.entity.Item;
import com.flolink.backend.domain.store.entity.ItemPurchaseHistory;
import com.flolink.backend.domain.user.entity.User;

public interface ItemService {

	ItemCommonResponse saveItem(final Item item);

	List<ItemCommonResponse> getAllItems();

	ItemCommonResponse getItemById(final Integer itemId);

	void deleteItem(final Integer itemId);

	ItemPurchaseResponse purchaseItem(final Integer userId, final Integer itemId);

	List<ItemPurchaseResponse> getPurchaseHistory(final Integer userId);

	ItemPurchaseHistory savePurchaseHistory(User user, Item item);

	void processUserPurchase(User user, Item item);

}
