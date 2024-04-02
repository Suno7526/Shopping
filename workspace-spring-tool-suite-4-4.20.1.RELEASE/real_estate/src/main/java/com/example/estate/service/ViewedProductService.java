package com.example.estate.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
}