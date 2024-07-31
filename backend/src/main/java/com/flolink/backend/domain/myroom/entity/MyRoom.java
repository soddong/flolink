package com.flolink.backend.domain.myroom.entity;

import java.util.ArrayList;
import java.util.List;

import com.flolink.backend.domain.store.entity.Item;
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

	public static MyRoom createMyRoom() {
		return MyRoom.builder()
			.build();
	}

	public void unequipPreItemAndEquipItem(HasItem hasItem) {
		Item item = hasItem.getItem();
		switch (item.getType()) {
			// RUG, SHELF, STAND, BED, MINITABLE, BIGTABLE, VASE
			case RUG:
				if (this.itemRug != null) {
					unequipItem(findById(this.itemRug));
				}
				this.itemRug = hasItem.getHasItemId();
				break;
			case SHELF:
				if (this.itemShelf != null) {
					unequipItem(findById(this.itemShelf));
				}
				this.itemShelf = hasItem.getHasItemId();
				break;
			case BED:
				if (this.itemBed != null) {
					unequipItem(findById(this.itemBed));
				}
				this.itemBed = hasItem.getHasItemId();
				break;
			case MINITABLE:
				if (this.itemMinitable != null) {
					unequipItem(findById(this.itemMinitable));
				}
				this.itemMinitable = hasItem.getHasItemId();
				break;
			case BIGTABLE:
				if (this.itemBigtable != null) {
					unequipItem(findById(this.itemBigtable));
				}
				this.itemBigtable = hasItem.getHasItemId();
				break;
			case VASE:
				if (this.itemVase != null) {
					unequipItem(findById(this.itemVase));
				}
				this.itemVase = hasItem.getHasItemId();
				break;
			default:
				throw new BadRequestException(ResponseCode.INVALID_ITEM_TYPE);
		}
		hasItem.equip();
	}

	public void unequipItem(HasItem hasItem) {
		Item item = hasItem.getItem();
		switch (item.getType()) {
			case RUG:
				this.itemRug = null;
				break;
			case SHELF:
				this.itemShelf = null;
				break;
			case BED:
				this.itemBed = null;
				break;
			case MINITABLE:
				this.itemMinitable = null;
				break;
			case BIGTABLE:
				this.itemBigtable = null;
				break;
			case VASE:
				this.itemVase = null;
				break;
			default:
				throw new BadRequestException(ResponseCode.INVALID_ITEM_TYPE);
		}
		hasItem.unequip();
	}

	private HasItem findById(Integer hasItemId) {
		return this.items.stream()
			.filter(item -> item.getHasItemId().equals(hasItemId))
			.findFirst()
			.orElseThrow(() -> new NotFoundException(ResponseCode.INVENTORY_NOT_FOUND));
	}
}
