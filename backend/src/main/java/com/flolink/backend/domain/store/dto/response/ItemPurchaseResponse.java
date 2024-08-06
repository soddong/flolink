package com.flolink.backend.domain.store.dto.response;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.flolink.backend.domain.store.entity.ItemPurchaseHistory;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ItemPurchaseResponse {
	private Integer itemId;
	private LocalDateTime transactionAt;
	private BigDecimal remainedPoint;

	// 엔티티 -> DTO
	public static ItemPurchaseResponse fromEntity(ItemPurchaseHistory itemPurchaseHistory) {
		return ItemPurchaseResponse.builder()
			.itemId(itemPurchaseHistory.getItem().getItemId())
			.remainedPoint(itemPurchaseHistory.getUser().getPoint())
			.transactionAt(itemPurchaseHistory.getPurchaseAt())
			.build();
	}
}
