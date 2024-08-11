package com.flolink.backend.domain.fcm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.flolink.backend.domain.fcm.entity.Fcm;
import com.flolink.backend.domain.user.entity.User;

@Repository
public interface FcmRepository extends JpaRepository<Fcm, Integer> {

	Fcm findByUser(User user);
}
