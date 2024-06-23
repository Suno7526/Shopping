package com.example.estate.service;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

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
    public void saveReview(List<MultipartFile> productImages, int reviewPoint, String reviewContent, Long userCode, Long productCode, Long orderCode) {
        try {
            User user = userRepository.findById(userCode).orElseThrow(() -> new RuntimeException("User not found"));
            Product product = productRepository.findById(productCode).orElseThrow(() -> new RuntimeException("Product not found"));
            Orders order = ordersRepository.findByOrderCode(orderCode);
            List<byte[]> images = productImages.stream()
                    .map(image -> {
                        try {
                            return image.getBytes();
                        } catch (IOException e) {
                            throw new RuntimeException("이미지 저장 실패");
                        }
                    }).collect(Collectors.toList());
            
            if (order == null) {
                throw new RuntimeException("Order not found");
            }

            Review review = new Review();
            review.setProductImages(images);
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
    public List<byte[]> getReviewImage(Long reviewCode) {
            Review review = reviewRepository.findById(reviewCode).orElse(null);
            Hibernate.initialize(review.getProductImages()); // Lazy 로딩된 컬렉션 초기화

            // 이미지 바이트 배열 추출
            List<byte[]> imageBytes = review.getProductImages().stream()
                    .map(imageData -> imageData) // 이미지 엔티티에서 바이트 배열 데이터 추출
                    .collect(Collectors.toList());

            return imageBytes;
    }
}
