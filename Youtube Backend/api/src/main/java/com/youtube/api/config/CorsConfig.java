package com.youtube.api.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class CorsConfig implements WebMvcConfigurer {

	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/api/**") // Specify the path pattern to apply CORS settings
				.allowedOrigins("http://127.0.0.1:5173") // Replace with your frontend's URL
				.allowedMethods("GET", "POST", "PUT", "DELETE").allowedHeaders("Authorization", "Content-Type")
				.allowCredentials(true); // Allow cookies in CORS requests if needed
	}
}
