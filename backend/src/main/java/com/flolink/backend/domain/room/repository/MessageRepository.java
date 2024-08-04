package com.flolink.backend.domain.room.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.flolink.backend.domain.room.entity.Message;

public interface MessageRepository extends JpaRepository<Message, Integer> {
}
