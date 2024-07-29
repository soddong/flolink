package com.flolink.backend.domain.user.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.flolink.backend.domain.user.entity.User;

public interface UserRepository extends JpaRepository<User, Integer> {

	boolean existsByUserName(String username);

	Optional<User> findByUserName(String username);
}



