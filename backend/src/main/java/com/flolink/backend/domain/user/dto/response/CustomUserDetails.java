package com.flolink.backend.domain.user.dto.response;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.flolink.backend.domain.myroom.entity.MyRoom;
import com.flolink.backend.domain.user.entity.User;
import com.flolink.backend.domain.user.entity.enumtype.RoleType;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class CustomUserDetails implements UserDetails {

	private final User user;

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return List.of();
	}

	@Override
	public String getPassword() {
		return user.getPassword();
	}

	@Override
	public String getUsername() {
		return user.getUserName();
	}

	public boolean getUseYn() {
		return user.isUseYn();
	}

	public String getLonginId() {
		return user.getLoginId();
	}

	public Integer getUserId() {
		return user.getUserId();
	}

	public MyRoom getMyRoom() {
		return user.getMyRoom();
	}

	public RoleType getRoleType() {
		return user.getRole();
	}

	@Override
	public boolean isAccountNonExpired() {
		return UserDetails.super.isAccountNonExpired();
	}

	@Override
	public boolean isAccountNonLocked() {
		return UserDetails.super.isAccountNonLocked();
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return UserDetails.super.isCredentialsNonExpired();
	}

	@Override
	public boolean isEnabled() {
		return UserDetails.super.isEnabled();
	}
}
