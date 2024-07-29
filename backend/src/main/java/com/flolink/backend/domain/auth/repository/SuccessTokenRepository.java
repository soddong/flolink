package com.flolink.backend.domain.auth.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.flolink.backend.domain.auth.entity.SuccessToken;

public interface SuccessTokenRepository extends JpaRepository<SuccessToken, Integer> {

	Optional<SuccessToken> findByToken(String token);

}
