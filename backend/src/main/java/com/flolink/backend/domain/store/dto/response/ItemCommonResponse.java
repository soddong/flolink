package com.flolink.backend.domain.store.dto.response;

import java.math.BigDecimal;

import com.flolink.backend.domain.store.entity.Item;
import com.flolink.backend.domain.store.entity.ItemType;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ItemCommonResponse {

	private Integer itemId;
	private String itemName;
	private ItemType type;
	private BigDecimal price;
	private String description;
	private String imageUrl;

	// 엔티티 -> DTO
	public static ItemCommonResponse fromEntity(Item item) {
		return ItemCommonResponse.builder()
			.itemId(item.getItemId())
			.itemName(item.getItemName())
			.type(item.getType())
			.price(item.getPrice())
			.description(item.getDescription())
			.imageUrl(item.getImageUrl())
			.build();
	}

}
