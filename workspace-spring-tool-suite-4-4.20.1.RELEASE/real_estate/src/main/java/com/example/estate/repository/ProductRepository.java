package com.example.estate.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.example.estate.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product>  {

	Product findByProductCode(Long productCode);

	List<Product> findByCategory(String category);

	List<Product> findByCategoryContainingIgnoreCaseOrProductNameContainingIgnoreCase(String category,
			String productName);
}
