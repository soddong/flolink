package com.flolink.backend.domain.noti.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.flolink.backend.domain.noti.entity.Noti;

public interface NotiRepository extends JpaRepository<Noti, Integer> {
}
