package com.flolink.backend.domain.room.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.flolink.backend.domain.room.entity.Nickname;

public interface NicknameRepository extends JpaRepository<Nickname, Integer> {
	Optional<Nickname> findByUserRoomUserRoomIdAndTargetUserRoomId(Integer userRoomId, Integer targetUserRoomId);
}
