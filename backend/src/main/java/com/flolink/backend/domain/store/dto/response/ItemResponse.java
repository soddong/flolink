package com.flolink.backend.domain.store.dto.response;

import java.math.BigDecimal;

import com.flolink.backend.domain.store.entity.Item;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ItemResponse {

	private Integer itemId;
	private String itemName;
	private String type;
	private BigDecimal price;
	private String description;
	private String imageUrl;

	// 엔티티 -> DTO
	public static ItemResponse fromEntity(Item item) {
		return ItemResponse.builder()
			.itemId(item.getItemId())
			.itemName(item.getItemName())
			.type(item.getType())
			.price(item.getPrice())
			.description(item.getDescription())
			.imageUrl(item.getImageUrl())
			.build();
	}

}
