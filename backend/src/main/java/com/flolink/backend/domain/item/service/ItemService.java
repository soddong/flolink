package com.flolink.backend.domain.item.service;

import java.util.List;

import com.flolink.backend.domain.item.dto.response.ItemPurchaseResponse;
import com.flolink.backend.domain.item.dto.response.ItemResponse;
import com.flolink.backend.domain.item.entity.Item;
import com.flolink.backend.domain.item.entity.ItemPurchase;
import com.flolink.backend.domain.user.entity.User;

public interface ItemService {

	ItemResponse saveItem(final Item item);

	List<ItemResponse> getAllItems();

	ItemResponse getItemById(final Integer itemId);

	void deleteItem(final Integer itemId);

	ItemPurchaseResponse purchaseItem(final Integer userId, final Integer itemId);

	List<ItemPurchaseResponse> getPurchaseLogs(final Integer userId);

	ItemPurchase savePurchaseLog(User user, Item item);

	void processUserPurchase(User user, Item item);

}
