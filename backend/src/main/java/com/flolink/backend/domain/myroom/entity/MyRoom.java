package com.flolink.backend.domain.myroom.entity;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import com.flolink.backend.domain.store.entity.Item;
import com.flolink.backend.domain.store.entity.ItemType;
import com.flolink.backend.global.common.ResponseCode;
import com.flolink.backend.global.common.exception.BadRequestException;
import com.flolink.backend.global.common.exception.NotFoundException;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
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
@Table(name = "my_room")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@SQLDelete(sql = "UPDATE my_room SET use_yn = false WHERE my_room_id = ?")
@SQLRestriction("use_yn = true")
public class MyRoom {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "my_room_id")
	private Integer myRoomId;

	@OneToMany(mappedBy = "myRoom", cascade = CascadeType.ALL, orphanRemoval = true)
	@Builder.Default
	private List<HasItem> items = new ArrayList<>();

	@Column(name = "item_stand")
	private Integer itemStand;

	@Column(name = "item_rug")
	private Integer itemRug;

	@Column(name = "item_shelf")
	private Integer itemShelf;

	@Column(name = "item_bed")
	private Integer itemBed;

	@Column(name = "item_bigtable")
	private Integer itemBigtable;

	@Column(name = "item_minitable")
	private Integer itemMinitable;

	@Column(name = "item_vase")
	private Integer itemVase;

	@ColumnDefault("1")
	@Column(name = "use_yn", nullable = false)
	private Boolean useYn;

	public static MyRoom createMyRoom() {
		return MyRoom.builder()
			.useYn(true)
			.build();
	}

	/**
	 * 1. 기존 아이템 장착해제
	 * 2. 새로운 아이템 장착
	 * @param hasItem
	 */
	public void unequipPreItemAndEquipItem(HasItem hasItem) {
		Item item = hasItem.getItem();
		unequipPreItem(item.getType());
		equipNewItem(item.getType(), hasItem.getHasItemId());
		hasItem.displayEquip();
	}

	/**
	 * 장착 해제
	 * @param hasItem
	 */
	public void unequipItem(HasItem hasItem) {
		Item item = hasItem.getItem();
		unequipMyRoom(item.getType());
		hasItem.displayUnequip();
	}

	private void unequipPreItem(ItemType itemType) {
		Integer currentItem = getCurrentItemId(itemType);
		if (currentItem != null) {
			unequipItem(findById(currentItem));
		}
	}

	private void equipNewItem(ItemType itemType, Integer hasItemId) {
		switch (itemType) {
			case RUG -> this.itemRug = hasItemId;
			case SHELF -> this.itemShelf = hasItemId;
			case STAND -> this.itemStand = hasItemId;
			case BED -> this.itemBed = hasItemId;
			case MINITABLE -> this.itemMinitable = hasItemId;
			case BIGTABLE -> this.itemBigtable = hasItemId;
			case VASE -> this.itemVase = hasItemId;
			default -> throw new BadRequestException(ResponseCode.INVALID_ITEM_TYPE);
		}
	}

	private void unequipMyRoom(ItemType itemType) {
		switch (itemType) {
			case RUG -> this.itemRug = null;
			case SHELF -> this.itemShelf = null;
			case STAND -> this.itemStand = null;
			case BED -> this.itemBed = null;
			case MINITABLE -> this.itemMinitable = null;
			case BIGTABLE -> this.itemBigtable = null;
			case VASE -> this.itemVase = null;
			default -> throw new BadRequestException(ResponseCode.INVALID_ITEM_TYPE);
		}
	}

	private Integer getCurrentItemId(ItemType itemType) {
		return switch (itemType) {
			case RUG -> this.itemRug;
			case SHELF -> this.itemShelf;
			case STAND -> this.itemStand;
			case BED -> this.itemBed;
			case MINITABLE -> this.itemMinitable;
			case BIGTABLE -> this.itemBigtable;
			case VASE -> this.itemVase;
		};
	}

	private HasItem findById(Integer hasItemId) {
		return this.items.stream()
			.filter(item -> item.getHasItemId().equals(hasItemId))
			.findFirst()
			.orElseThrow(() -> new NotFoundException(ResponseCode.INVENTORY_NOT_FOUND));
	}
}
