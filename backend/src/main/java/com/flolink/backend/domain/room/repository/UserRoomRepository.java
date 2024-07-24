package com.flolink.backend.domain.room.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.flolink.backend.domain.room.entity.UserRoom;

public interface UserRoomRepository extends JpaRepository<UserRoom, Integer> {
}
