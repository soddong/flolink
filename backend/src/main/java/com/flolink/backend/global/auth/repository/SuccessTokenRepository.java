package com.flolink.backend.global.auth.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.flolink.backend.global.auth.entity.SuccessToken;

@Repository
public interface SuccessTokenRepository extends JpaRepository<SuccessToken, Integer> {

	Optional<SuccessToken> findByToken(String token);

	void deleteByToken(String token);

	boolean existsByTel(String tel);

	@Modifying
	@Query("delete from SuccessToken a where a.tel = :tel")
	void deleteByTel(@Param("tel") String tel);

}
