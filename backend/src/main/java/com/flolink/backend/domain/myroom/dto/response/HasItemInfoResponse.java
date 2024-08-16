package com.flolink.backend.domain.myroom.dto.response;

import com.flolink.backend.domain.myroom.entity.HasItem;
import com.flolink.backend.domain.store.entity.ItemType;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class HasItemInfoResponse {
	private Integer hasItemId;
	private String itemName;
	private ItemType type;
	private String description;
	private String imageUrl;
	private Boolean equippedYn;

	public static HasItemInfoResponse fromEntity(HasItem hasItem) {
		return HasItemInfoResponse.builder()
			.hasItemId(hasItem.getHasItemId())
			.itemName(hasItem.getItem().getItemName())
			.type(hasItem.getItem().getType())
			.description(hasItem.getItem().getDescription())
			.imageUrl(hasItem.getItem().getImageUrl())
			.equippedYn(hasItem.getEquippedYn())
			.build();
	}
}
