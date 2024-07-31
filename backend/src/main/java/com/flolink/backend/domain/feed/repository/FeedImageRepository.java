package com.flolink.backend.domain.feed.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.flolink.backend.domain.feed.entity.FeedImage;

@Repository
public interface FeedImageRepository extends JpaRepository<FeedImage, Integer> {
}
