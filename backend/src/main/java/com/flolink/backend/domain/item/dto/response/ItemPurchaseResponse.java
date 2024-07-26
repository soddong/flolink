package com.flolink.backend.domain.item.dto.response;

import java.math.BigDecimal;

import com.flolink.backend.domain.item.entity.ItemPurchase;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ItemPurchaseResponse {

	private Integer purchaseId;
	private Integer itemId;
	private BigDecimal remainedPoint;

	// 엔티티 -> DTO
	public static ItemPurchaseResponse fromEntity(ItemPurchase itemPurchase) {
		return ItemPurchaseResponse.builder()
			.itemId(itemPurchase.getItem().getItemId())
			.purchaseId(itemPurchase.getPurchaseId())
			.remainedPoint(itemPurchase.getUser().getPoint())
			.build();
	}
}
