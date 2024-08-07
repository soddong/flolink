package com.flolink.backend.domain.myroom.entity;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import com.flolink.backend.domain.store.entity.Item;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
@Table(name = "has_item")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@SQLDelete(sql = "UPDATE has_item SET use_yn = false WHERE has_item_id = ?")
@Where(clause = "use_yn = true")
public class HasItem {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "has_item_id")
	private Integer hasItemId;

	@ManyToOne
	@JoinColumn(name = "item_id", nullable = false)
	private Item item;

	@ManyToOne
	@JoinColumn(name = "my_room_id", nullable = false)
	private MyRoom myRoom;

	@ColumnDefault("0")
	@Column(name = "equipped_yn", nullable = false)
	private Boolean equippedYn;

	@ColumnDefault("1")
	@Column(name = "use_yn", nullable = false)
	private Boolean useYn;

	public void displayEquip() {
		this.equippedYn = true;
	}

	public void displayUnequip() {
		this.equippedYn = false;
	}

	public static HasItem of(MyRoom myRoom, Item item) {
		return HasItem.builder()
			.item(item)
			.myRoom(myRoom)
			.equippedYn(false)
			.useYn(true)
			.build();
	}
}
