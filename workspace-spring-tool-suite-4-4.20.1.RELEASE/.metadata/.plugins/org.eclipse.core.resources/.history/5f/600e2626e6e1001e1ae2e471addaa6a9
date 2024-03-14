package com.example.estate.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.estate.entity.Product;
import com.example.estate.entity.RecentlyViewedProduct;
import com.example.estate.entity.User;
import com.example.estate.repository.RecentlyViewedProductRepository;

import java.util.List;

@Service
public class RecentlyViewedProductService {

    @Autowired
    private RecentlyViewedProductRepository recentlyViewedProductRepository;

    public List<RecentlyViewedProduct> getRecentlyViewedProducts(User user) {
        // 사용자가 최근에 본 상품 리스트를 가져옵니다.
        return recentlyViewedProductRepository.findTop5ByUserOrderByViewCodeDesc(user);
    }

    public void saveViewedProduct(User user, Product product) {
        // 사용자가 상품을 볼 때마다 이 정보를 저장합니다.
        RecentlyViewedProduct recentlyViewedProduct = RecentlyViewedProduct.builder()
                .user(user)
                .product(product)
                .build();

        recentlyViewedProductRepository.save(recentlyViewedProduct);
    }
    
    // 나머지 메서드들...
}
