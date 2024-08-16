package com.flolink.backend.domain.myroom.service;

import java.util.List;

import com.flolink.backend.domain.myroom.dto.response.HasItemInfoResponse;
import com.flolink.backend.domain.myroom.entity.HasItem;
import com.flolink.backend.domain.store.entity.Item;
import com.flolink.backend.domain.user.entity.User;

public interface HasItemService {

	HasItem saveHasItem(User user, Item item);

	List<HasItemInfoResponse> getHasItems(Integer userId);

}
