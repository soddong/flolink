package com.flolink.backend.domain.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.flolink.backend.domain.user.entity.User;

public interface UserRepository extends JpaRepository<User, Integer> {

	boolean existsByLoginId(String username);
}



