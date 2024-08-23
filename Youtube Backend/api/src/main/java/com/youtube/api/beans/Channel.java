package com.youtube.api.beans;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "channel_table")
public class Channel {

	@Id
	@Column(name = "channel_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Column(name = "channel_name", nullable = false)
	private String name;

	@Column(name = "profile_url", nullable = false)
	private String profileUrl;

	@Column(name = "channel_verified", nullable = false)
	private boolean verified;

	@OneToMany(mappedBy = "channel", cascade = CascadeType.ALL)
	List<Video> videos;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getProfileUrl() {
		return profileUrl;
	}

	public void setProfileUrl(String profileUrl) {
		this.profileUrl = profileUrl;
	}

	public boolean isVerified() {
		return verified;
	}

	public void setVerified(boolean verified) {
		this.verified = verified;
	}

	@Override
	public String toString() {
		return "Channel [id=" + id + ", name=" + name + ", profileUrl=" + profileUrl + ", verified=" + verified + "]";
	}
}