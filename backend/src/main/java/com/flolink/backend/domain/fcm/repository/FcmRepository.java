package com.flolink.backend.domain.fcm.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.flolink.backend.domain.fcm.entity.Fcm;
import com.flolink.backend.domain.user.entity.User;

@Repository
public interface FcmRepository extends JpaRepository<Fcm, Integer> {
	Optional<Fcm> findByUserUserId(Integer userId);

	@Query("SELECT f FROM Fcm f "
		+ "WHERE f.user.userId IN :userIds "
		+ "AND f.user.useYn = true")
	List<Fcm> findAllByUserIds(@Param("userIds") List<Integer> userIds);

	Fcm findByUser(User user);
}
