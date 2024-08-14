package com.flolink.backend.domain.user.repository;

import java.util.Optional;

import com.flolink.backend.domain.user.dto.response.UserProfileResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.flolink.backend.domain.user.entity.User;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<User, Integer> {

	Optional<User> findByUserIdAndUseYnTrue(Integer userId);

	boolean existsByLoginId(String loginId);

	Optional<User> findByLoginId(String loginId);

	Optional<User> findByTel(String tel);

	int findRoomIdByLoginId(String loginId);

	int findUserIdByLoginId(String loginId);

	@Query("SELECT u.loginId from User u where u.userId=:userId and u.useYn=true ")
	String findLoginIdByUserId(int userId);

	@Query("SELECT new com.flolink.backend.domain.user.dto.response.UserProfileResponse(u.profile, u.emotion) " +
			"FROM User u WHERE u.userId = :userId AND u.useYn = true")
	Optional<UserProfileResponse> findUserProfileByUserId(@Param("userId") Integer userId);
}



