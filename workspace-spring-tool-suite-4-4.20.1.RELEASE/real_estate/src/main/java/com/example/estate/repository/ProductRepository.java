package com.example.estate.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.estate.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long>{

	Product findByProductCode(Long productCode);
	
	List<Product> findByCategory(String category);

}
