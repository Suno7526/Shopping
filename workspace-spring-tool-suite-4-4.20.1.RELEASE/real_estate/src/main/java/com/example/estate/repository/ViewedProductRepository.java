package com.example.estate.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.estate.entity.ViewedProduct;

public interface ViewedProductRepository extends JpaRepository<ViewedProduct, Long> {
	
	List<ViewedProduct> findByUserUserCode(Long userCode); // findByUserUserCode 메서드 추가
	
	List<ViewedProduct> findTop10ByUserUserCodeOrderByViewCodeDesc(Long userCode);
}
