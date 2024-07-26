package com.flolink.backend.domain.item.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ItemPurchaseRequest {
	private Integer itemId;
}
