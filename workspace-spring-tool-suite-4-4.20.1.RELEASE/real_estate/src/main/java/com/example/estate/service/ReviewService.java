package com.example.estate.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.estate.entity.Product;
import com.example.estate.entity.Review;
import com.example.estate.entity.User;
import com.example.estate.repository.ProductRepository;
import com.example.estate.repository.ReviewRepository;
import com.example.estate.repository.UserRepository;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @Transactional
    public void saveReview(byte[] productImage, int reviewPoint, String reviewContent, Long productCode, Long userCode) {
        try {
            User user = userRepository.findById(userCode).orElseThrow(() -> new RuntimeException("User not found"));
            Product product = productRepository.findById(productCode).orElseThrow(() -> new RuntimeException("Product not found"));

            Review review = new Review();
            review.setProductImage(productImage);
            review.setReviewPoint(reviewPoint);
            review.setReviewContent(reviewContent);
            review.setUser(user);
            review.setProduct(product);

            reviewRepository.save(review);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("리뷰 저장 실패");
        }
    }
}
