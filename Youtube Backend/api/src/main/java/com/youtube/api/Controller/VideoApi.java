package com.youtube.api.Controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.youtube.api.beans.Video;

@CrossOrigin
@RestController
public interface VideoApi {

	@GetMapping()
	public String welcomePage();

	@GetMapping("/allVideos")
	public List<Video> getAllVideos();

	@PostMapping("/addVideo")
	public Video saveVideo(@RequestBody Video body);

	@PostMapping("/addAllVideos")
	public List<Video> saveVidoes(@RequestBody List<Video> body);
}
