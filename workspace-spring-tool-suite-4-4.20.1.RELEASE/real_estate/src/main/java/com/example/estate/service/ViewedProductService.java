package com.example.estate.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.estate.entity.Cart;
import com.example.estate.entity.Product;
import com.example.estate.entity.ViewedProduct;
import com.example.estate.entity.User;
import com.example.estate.repository.ViewedProductRepository;

import java.util.List;

@Service
public class ViewedProductService {

    @Autowired
    private ViewedProductRepository viewedProductRepository;

    @Transactional
    public void saveViewedProduct(User user, Product product) {
        ViewedProduct viewedProduct = new ViewedProduct();
        viewedProduct.setUser(user);
        viewedProduct.setProduct(product);
        viewedProductRepository.save(viewedProduct);
    }
    
    @Transactional(readOnly = true)
    public List<ViewedProduct> findByUserCode(Long userCode) {
        return viewedProductRepository.findByUserUserCode(userCode);
    }
    
    @Transactional(readOnly = true)
    public List<ViewedProduct> findRecentViewedProducts(Long userCode, int limit) {
        return viewedProductRepository.findTop10ByUserUserCodeOrderByViewCodeDesc(userCode);
    }

}