package com.flolink.backend.domain.plant.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.flolink.backend.domain.plant.entity.UserExpHistory;

public interface UserExpHistoryRepository extends JpaRepository<UserExpHistory, Integer> {

}
