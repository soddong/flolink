package com.flolink.backend.domain.room.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.flolink.backend.domain.room.entity.Room;
import com.flolink.backend.domain.room.entity.UserRoom;
import com.flolink.backend.domain.user.entity.User;

@Repository
public interface UserRoomRepository extends JpaRepository<UserRoom, Integer> {
	Optional<UserRoom> findByUserAndRoom(User user, Room room);

	Optional<UserRoom> findUserRoomByUserRoomId(Integer userRoomId);

	@Query("SELECT UserRoom u from UserRoom where u.user.userId=:userId and u.room.roomId=:roomId ")
	Optional<UserRoom> findByUserUserIdAndRoomRoomId(@Param("userId") Integer userId, @Param("roomId") Integer roomId);

	boolean existsByUserUserIdAndRoomRoomId(Integer userId, Integer roomId);
}
