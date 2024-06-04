package com.example.estate.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    public void saveProduct(byte[] productImage, String productName, String information, int productPrice, String companyName, int productStuck, String category) {
        try {
            Product product = new Product();
            product.setProductName(productName);
            product.setInformation(information);
            product.setProductPrice(productPrice);
            product.setCompanyName(companyName);
            product.setProductStuck(productStuck);
            product.setProductImage(productImage);
            product.setCategory(category);
            productRepository.save(product);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("상품 저장 실패");
        }
    }

    @Transactional(readOnly = true)
    public byte[] getProductImage(Long productCode) {
        try {
            Product product = findByProductCode(productCode);
            if (product != null) {
                return product.getProductImage();
            }
            return null;
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("이미지 가져오기 실패");
        }
    }

    @Transactional(readOnly = true)
    public Product findByProductCode(Long productCode) {
        return productRepository.findByProductCode(productCode);
    }

    @Transactional(readOnly = true)
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Transactional
    public void incrementViewCount(Long productCode) {
        Product product = productRepository.findByProductCode(productCode);
        if (product != null) {
            product.setViewCount(product.getViewCount() + 1);
            productRepository.save(product);
        }
    }
    
    public List<Product> getProductsByCategory(String category) {
        return productRepository.findByCategory(category);
    }

    @Transactional
    public void deleteProduct(Long productCode) {
    	productRepository.deleteById(productCode);
    	viewedProductRepository.deleteById(productCode);
    }
    
    @Transactional
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
