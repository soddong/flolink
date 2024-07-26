package com.flolink.backend.domain.room.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.flolink.backend.domain.room.entity.Room;
import com.flolink.backend.domain.room.entity.UserRoom;
import com.flolink.backend.domain.user.entity.User;

public interface UserRoomRepository extends JpaRepository<UserRoom, Integer> {
	UserRoom findByUserAndRoom(User user, Room room);
}
