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
	private List<HasItem> items = new ArrayList<>();

	@Column(name = "item_table")
	private Integer itemTable;

	@Column(name = "item_chair")
	private Integer itemChair;

	@Column(name = "item_pot")
	private Integer itemPot;

	@Column(name = "item_photo_frame")
	private Integer itemPhotoFrame;

	public static MyRoom createMyRoom() {
		return MyRoom.builder()
			.items(new ArrayList<>())
			.build();
	}

	public void unequipPreItemAndEquipItem(HasItem hasItem) {
		Item item = hasItem.getItem();
		switch (item.getType()) {
			case TABLE:
				if (this.itemTable != null) {
					unequipItem(findById(this.itemTable));
				}
				this.itemTable = hasItem.getHasItemId();
				break;
			case CHAIR:
				if (this.itemChair != null) {
					unequipItem(findById(this.itemChair));
				}
				this.itemChair = hasItem.getHasItemId();
				break;
			case POT:
				if (this.itemPot != null) {
					unequipItem(findById(this.itemPot));
				}
				this.itemPot = hasItem.getHasItemId();
				break;
			case PHOTO_FRAME:
				if (this.itemPhotoFrame != null) {
					unequipItem(findById(this.itemPhotoFrame));
				}
				this.itemPhotoFrame = hasItem.getHasItemId();
				break;
			default:
				throw new BadRequestException(ResponseCode.INVALID_ITEM_TYPE);
		}
		hasItem.equip();
	}

	public void unequipItem(HasItem hasItem) {
		Item item = hasItem.getItem();
		switch (item.getType()) {
			case TABLE:
				this.itemTable = null;
				break;
			case CHAIR:
				this.itemChair = null;
				break;
			case POT:
				this.itemPot = null;
				break;
			case PHOTO_FRAME:
				this.itemPhotoFrame = null;
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
