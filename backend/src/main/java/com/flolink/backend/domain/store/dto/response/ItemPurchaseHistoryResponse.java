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
public class ItemPurchaseHistoryResponse {
	private String itemName;
	private LocalDateTime transactionAt;

	// 엔티티 -> DTO
	public static ItemPurchaseHistoryResponse fromEntity(ItemPurchaseHistory itemPurchaseHistory) {
		return ItemPurchaseHistoryResponse.builder()
			.itemName(itemPurchaseHistory.getItem().getItemName())
			.transactionAt(itemPurchaseHistory.getPurchaseAt())
			.build();
	}
}
