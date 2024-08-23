package com.youtube.api.Controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.youtube.api.Repository.VideoRepository;
import com.youtube.api.beans.Video;
import com.youtube.api.constants.AppConstants;

@Service
public class VideoApiImpl implements VideoApi {

	@Autowired
	VideoRepository videoRepo;

	@Override
	public String welcomePage() {
		return AppConstants.HOMEPAGE_MESSAGE;
	}

	@Override
	public List<Video> getAllVideos() {
		return videoRepo.findAll();
	}

	@Override
	public List<Video> saveVidoes(List<Video> body) {
		List<Video> videosList = new ArrayList<>();

		for (Video video : body)
			videosList.add(videoRepo.save(video));

		return videosList;
	}

	@Override
	public Video saveVideo(Video body) {
		return videoRepo.save(body);
	}

}
