package com.flolink.backend.domain.item.dto.request;

import java.time.LocalDateTime;

import com.flolink.backend.domain.item.entity.Item;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ItemRequest {

	private String itemName;
	private String type;
	private float price;
	private String description;
	private String imageUrl;

	// 엔티티 -> DTO
	public static ItemRequest fromEntity(Item item) {
		return ItemRequest.builder()
			.itemName(item.getItemName())
			.type(item.getType())
			.price(item.getPrice())
			.description(item.getDescription())
			.imageUrl(item.getImageUrl())
			.build();
	}

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
