package com.flolink.backend.domain.room.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.flolink.backend.domain.room.entity.Nickname;

public interface NicknameRepository extends JpaRepository<Nickname, Integer> {
	
}
