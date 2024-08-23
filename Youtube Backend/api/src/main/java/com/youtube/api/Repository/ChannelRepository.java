package com.youtube.api.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.youtube.api.beans.Channel;

public interface ChannelRepository extends JpaRepository<Channel, Long> {

}
