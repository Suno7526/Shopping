package com.example.estate.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.estate.entity.ViewedProduct;

public interface ViewedProductRepository extends JpaRepository<ViewedProduct, Long> {
	
}
