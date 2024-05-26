package com.example.estate.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.estate.entity.Review;

public interface ReviewRepository extends JpaRepository<Review, Long> {
	
	List<Review> findByProduct_ProductCode(Long productCode);
	
	Review findFirstByProduct_ProductCode(Long reviewCode);
	
	
}
