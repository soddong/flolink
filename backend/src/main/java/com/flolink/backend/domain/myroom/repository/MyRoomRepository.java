package com.flolink.backend.domain.myroom.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.flolink.backend.domain.myroom.entity.MyRoom;

public interface MyRoomRepository extends JpaRepository<MyRoom, Integer> {
}
