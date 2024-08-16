package com.flolink.backend.global.auth.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import com.flolink.backend.global.auth.entity.Refresh;

public interface RefreshRepository extends JpaRepository<Refresh, Integer> {

	Boolean existsByRefreshToken(String refreshToken);

	@Transactional
	void deleteByRefreshToken(String refreshToken);
}
