package com.example.estate.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.estate.entity.Product;
import com.example.estate.entity.Review;
import com.example.estate.service.ReviewService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @PostMapping("/saveReview")
    public ResponseEntity<String> saveReview(@RequestParam("productImage") MultipartFile productImage,
                                             @RequestParam("reviewPoint") int reviewPoint,
                                             @RequestParam("reviewContent") String reviewContent,
                                             @RequestParam("userCode") Long userCode,
                                             @RequestParam("productCode") Long productCode) {
        try {
            byte[] imageBytes = productImage.getBytes();
            reviewService.saveReview(imageBytes, reviewPoint, reviewContent, userCode, productCode);
            return new ResponseEntity<>("리뷰 등록 성공", HttpStatus.OK);
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>("리뷰 등록에 실패했습니다. 다시 시도해주세요.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
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
    
}
