package com.example.estate.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.estate.entity.Orders;
import com.example.estate.entity.Product;
import com.example.estate.entity.Review;
import com.example.estate.entity.User;
import com.example.estate.repository.OrdersRepository;
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

    @Autowired
    private OrdersRepository ordersRepository;

    @Transactional
    public void saveReview(byte[] productImage, int reviewPoint, String reviewContent, Long userCode, Long productCode) {
        try {
            User user = userRepository.findById(userCode).orElseThrow(() -> new RuntimeException("User not found"));
            Product product = productRepository.findById(productCode).orElseThrow(() -> new RuntimeException("Product not found"));
            Orders order = ordersRepository.findByUser_UserCodeAndProduct_ProductCode(userCode, productCode);

            if (order == null) {
                throw new RuntimeException("Order not found");
            }

            Review review = new Review();
            review.setProductImage(productImage);
            review.setReviewPoint(reviewPoint);
            review.setReviewContent(reviewContent);
            review.setUser(user);
            review.setProduct(product);

            reviewRepository.save(review);

            order.setReviewCheck(true); // reviewCheck 값을 true로 설정
            ordersRepository.save(order);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("리뷰 저장 실패");
        }
    }
    
    @Transactional(readOnly = true)
    public List<Review> getReviewsByProductCode(Long productCode) {
        try {
            return reviewRepository.findByProduct_ProductCode(productCode);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("상품에 대한 리뷰를 가져오는 중 오류 발생");
        }
    }
    
    @Transactional(readOnly = true)
    public byte[] getReviewImage(Long reviewCode) {
        try {
            Review review = reviewRepository.findById(reviewCode).orElse(null);
            if (review != null) {
                return review.getProductImage();
            }
            return null;
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("이미지 가져오기 실패");
        }
    }
}
