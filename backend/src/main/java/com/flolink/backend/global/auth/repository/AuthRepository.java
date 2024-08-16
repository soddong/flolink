package com.flolink.backend.global.auth.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.flolink.backend.global.auth.entity.Auth;

@Repository
public interface AuthRepository extends JpaRepository<Auth, Integer> {

	Optional<Auth> findByTel(String tel);

	@Modifying
	@Query("delete from Auth a where a.tel = :tel")
	void deleteByTel(@Param("tel") String tel);

	boolean existsByTel(String tel);

	Optional<Auth> findByAuthNum(String AuthNum);

}
