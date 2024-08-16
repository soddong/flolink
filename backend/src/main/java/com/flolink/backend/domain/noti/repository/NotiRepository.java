package com.flolink.backend.domain.noti.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.flolink.backend.domain.noti.entity.Noti;

public interface NotiRepository extends JpaRepository<Noti, Integer> {

	@Query("SELECT n FROM Noti n "
		+ "WHERE n.userRoom.userRoomId =:userRoomId "
		+ "AND n.userRoom.useYn = true "
		+ "ORDER BY n.createAt DESC "
		+ "LIMIT 5")
	List<Noti> findByUserRoomId(@Param("userRoomId") Integer userRoomId);
}
