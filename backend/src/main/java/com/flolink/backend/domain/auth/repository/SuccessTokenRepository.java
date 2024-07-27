package com.flolink.backend.domain.auth.repository;

import com.flolink.backend.domain.auth.entity.SuccessToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface SuccessTokenRepository extends JpaRepository<SuccessToken, Integer> {

    Optional<SuccessToken> findByToken(String token);

    @Query("SELECT upt.tel FROM SuccessToken upt WHERE upt.token = :token")
    String findTelByToken(@Param("tel") String token);

}
