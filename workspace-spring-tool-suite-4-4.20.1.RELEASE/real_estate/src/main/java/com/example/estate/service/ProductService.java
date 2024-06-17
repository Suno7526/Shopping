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
import com.example.estate.entity.ViewedProduct;
import com.example.estate.repository.OrdersRepository;
import com.example.estate.repository.ProductRepository;
import com.example.estate.repository.ViewedProductRepository;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private OrdersRepository ordersRepository;
    
    @Autowired
    private ViewedProductRepository viewedProductRepository;
    
    @Transactional
    public void saveProduct(List<MultipartFile> productImages, String productName, String information, int productPrice, String companyName, int productStuck, String category) throws IOException {
        try {
            List<byte[]> images = productImages.stream()
                .map(image -> {
                    try {
                        return image.getBytes();
                    } catch (IOException e) {
                        throw new RuntimeException("이미지 저장 실패");
                    }
                }).collect(Collectors.toList());

            Product product = new Product();
            product.setProductName(productName);
            product.setInformation(information);
            product.setProductPrice(productPrice);
            product.setCompanyName(companyName);
            product.setProductStuck(productStuck);
            product.setProductImages(images); // 이 부분을 배열로 설정
            product.setCategory(category);
            productRepository.save(product);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("상품 저장 실패");
        }
    }

    @Transactional(readOnly = true)
    public List<byte[]> getProductImages(Long productCode) {
        Product product = productRepository.findByProductCode(productCode);
        Hibernate.initialize(product.getProductImages()); // Lazy 로딩된 컬렉션 초기화

        // 이미지 바이트 배열 추출
        List<byte[]> imageBytes = product.getProductImages().stream()
                .map(imageData -> imageData) // 이미지 엔티티에서 바이트 배열 데이터 추출
                .collect(Collectors.toList());

        return imageBytes;
    }

    @Transactional(readOnly = true)
    public Product findByProductCode(Long productCode) {
        return productRepository.findByProductCode(productCode);
    }

    @Transactional(readOnly = true)
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Transactional(readOnly = true)
    public void incrementViewCount(Long productCode) {
        Product product = productRepository.findByProductCode(productCode);
        if (product != null) {
            product.setViewCount(product.getViewCount() + 1);
            productRepository.save(product);
        }
    }
    
    @Transactional(readOnly = true)
    public List<Product> getProductsByCategory(String category) {
        return productRepository.findByCategory(category);
    }

    @Transactional(readOnly = true)
    public void deleteProduct(Long productCode) {
    	productRepository.deleteById(productCode);
    	viewedProductRepository.deleteById(productCode);
    }
    
    @Transactional(readOnly = true)
    public boolean updateProduct(Long productCode, Product updatedProduct) {
        Product existingProduct = productRepository.findByProductCode(productCode);
        if (existingProduct != null) {
            existingProduct.setProductName(updatedProduct.getProductName());
            existingProduct.setProductPrice(updatedProduct.getProductPrice());
            existingProduct.setProductStuck(updatedProduct.getProductStuck());
            // Add any other fields that need to be updated
            productRepository.save(existingProduct);
            return true;
        }
        return false;
    }
    
    
    @Transactional(readOnly = true)
    public List<Product> searchProducts(String query) {
        return productRepository.findByCategoryContainingIgnoreCaseOrProductNameContainingIgnoreCase(query, query);
    }
    
    @Transactional(readOnly = true)
    public List<Product> recommendProducts(Long userCode) {
        // 최근 본 상품 가져오기
        List<ViewedProduct> viewedProducts = viewedProductRepository.findByUserUserCode(userCode);
        List<Long> viewedProductCodes = viewedProducts.stream()
                .map(vp -> vp.getProduct())
                .filter(product -> product != null)
                .map(product -> product.getProductCode())
                .collect(Collectors.toList());

        // 주문한 상품 가져오기
        List<Orders> orders = ordersRepository.findByUserUserCode(userCode);
        List<Long> orderedProductCodes = orders.stream()
                .map(o -> o.getProduct())
                .filter(product -> product != null)
                .map(product -> product.getProductCode())
                .collect(Collectors.toList());

        // 추천 상품 리스트 생성
        List<Product> recommendedProducts = productRepository.findAllById(viewedProductCodes);
        recommendedProducts.addAll(productRepository.findAllById(orderedProductCodes));

        // 중복 제거
        return recommendedProducts.stream().distinct().collect(Collectors.toList());
    }
    
    
}
