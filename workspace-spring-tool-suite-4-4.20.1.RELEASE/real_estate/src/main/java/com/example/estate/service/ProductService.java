package com.example.estate.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.example.estate.entity.Product;
import com.example.estate.repository.ProductRepository;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

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

            // 이미지 파일 이름을 랜덤으로 생성
            String imageFileName = UUID.randomUUID().toString() + "_productImage";

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

    public Product getProductByCode(Long productCode) {
        return productRepository.findByProductCode(productCode);
    }

    @Transactional(readOnly = true)
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

}
