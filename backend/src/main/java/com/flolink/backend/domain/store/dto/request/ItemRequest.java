package com.flolink.backend.domain.store.dto.request;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.flolink.backend.domain.store.entity.Item;
import com.flolink.backend.domain.store.entity.ItemType;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ItemRequest {

	private String itemName;
	private ItemType type;
	private BigDecimal price;
	private String description;
	private String imageUrl;

	// DTO -> 엔티티
	public Item toEntity() {
		return Item.builder()
			.itemName(this.itemName)
			.type(this.type)
			.price(this.price)
			.description(this.description)
			.imageUrl(this.imageUrl)
			.createAt(LocalDateTime.now())
			.useYn(true)
			.build();
	}
}
