package com.example.estate.controller;

import java.io.IOException;
import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.estate.entity.Review;
import com.example.estate.service.ReviewService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ReviewController {

	@Autowired
	private ReviewService reviewService;

	@PostMapping("/saveReview")
	public ResponseEntity<String> saveReview(@RequestParam("productImages") List<MultipartFile> productImages,
			@RequestParam("reviewPoint") int reviewPoint, @RequestParam("reviewContent") String reviewContent,
			@RequestParam("userCode") Long userCode, @RequestParam("productCode") Long productCode,
			@RequestParam("orderCode") Long orderCode) {
		reviewService.saveReview(productImages, reviewPoint, reviewContent, userCode, productCode, orderCode);
		return new ResponseEntity<>("리뷰 등록 성공", HttpStatus.OK);
	}

	@GetMapping("/getReviews/{productCode}")
	public ResponseEntity<List<Review>> getReviews(@PathVariable("productCode") Long productCode) {
		try {
			List<Review> reviews = reviewService.getReviewsByProductCode(productCode);
			return new ResponseEntity<>(reviews, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/getReviewImages/{reviewCode}")
	public ResponseEntity<List<String>> getProductImages(@PathVariable("reviewCode") Long reviewCode) {
		try {
			List<byte[]> imageBytesList = reviewService.getReviewImage(reviewCode);
			List<String> base64Images = imageBytesList.stream()
					.map(imageBytes -> Base64.getEncoder().encodeToString(imageBytes)).collect(Collectors.toList());
			return new ResponseEntity<>(base64Images, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
