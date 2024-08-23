package com.youtube.api.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.youtube.api.beans.Video;

public interface VideoRepository extends JpaRepository<Video, Long> {
}
