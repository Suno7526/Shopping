package com.example.estate.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.estate.entity.Product;
import com.example.estate.repository.ProductRepository;

@Service
public class ProductService {

	@Value("${upload.path}")
	private String uploadPath;

	@Autowired
	private ProductRepository productRepository;

	@Transactional
	public void saveProduct(byte[] productImage, String productName, String infomation, int productPrice) {
		try {
			Product product = new Product();
			product.setProductName(productName);
			product.setInfomation(infomation);
			product.setProductPrice(productPrice);

			// Product 엔터티에 이미지 파일 저장
			product.setProductImage(productImage);

			// Product 엔터티를 저장
			productRepository.save(product);
		} catch (Exception e) {
			// 예외 처리
			e.printStackTrace();
			throw new RuntimeException("Failed to save product with image");
		}
	}

	@Transactional(readOnly = true)
	public byte[] getProductImage(Long productCode) {
		try {
			Product product = productRepository.findByProductCode(productCode);
			if (product != null) {
				return product.getProductImage();
			}
			return null; // 해당하는 제품이 없는 경우 null 반환
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException("Failed to get product image");
		}
	}

	@Transactional(readOnly = true)
	public List<Product> getAllProducts() {
		return productRepository.findAll();
	}

}
