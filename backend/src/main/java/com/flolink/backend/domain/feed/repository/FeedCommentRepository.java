package com.flolink.backend.domain.feed.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.flolink.backend.domain.feed.entity.FeedComment;

@Repository
public interface FeedCommentRepository extends JpaRepository<FeedComment, Integer> {
}
