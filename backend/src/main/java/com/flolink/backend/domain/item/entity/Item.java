package com.flolink.backend.domain.item.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@Builder
@Table(name = "item")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class Item {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "item_id")
	private Integer itemId;

	@Column(name = "name", nullable = false, length = 100)
	private String itemName;

	@Column(name = "type", nullable = false, length = 100)
	private String type;

	@Column(name = "price", nullable = false)
	private BigDecimal price;

	@Column(name = "description", length = 255)
	private String description;

	@Column(name = "image_url", length = 100)
	private String imageUrl;

	@Column(name = "create_at", nullable = false)
	private LocalDateTime createAt;

	@Column(name = "use_yn", nullable = false)
	private Boolean useYn;
}
