package com.flolink.backend.domain.auth.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.flolink.backend.domain.auth.entity.Auth;

public interface AuthRepository extends JpaRepository<Auth, Integer> {

	Auth findBytel(String tel);

	void deleteByTel(String tel);

	boolean existsByTel(String tel);

}
