package com.flolink.backend.domain.auth.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.flolink.backend.domain.auth.entity.Auth;

public interface AuthRepository extends JpaRepository<Auth, Integer> {

	Optional<Auth> findByTel(String tel);

	void deleteByTel(String tel);

	boolean existsByTel(String tel);

}
