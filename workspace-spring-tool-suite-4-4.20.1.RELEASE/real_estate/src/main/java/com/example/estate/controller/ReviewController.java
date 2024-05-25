package com.example.estate.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

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
        	System.out.println(userCode);
        	System.out.println(productCode);
            byte[] imageBytes = productImage.getBytes();
            reviewService.saveReview(imageBytes, reviewPoint, reviewContent, userCode, productCode);
            return new ResponseEntity<>("리뷰 등록 성공", HttpStatus.OK);
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>("리뷰 등록에 실패했습니다. 다시 시도해주세요.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
