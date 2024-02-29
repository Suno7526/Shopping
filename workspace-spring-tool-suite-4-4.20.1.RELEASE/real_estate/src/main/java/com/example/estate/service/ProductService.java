package com.example.estate.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.estate.entity.Product;
import com.example.estate.repository.ProductRepository;

@Service
public class ProductService {

 @Autowired
 private ProductRepository productRepository;

 @Transactional
 public void saveProduct(Product product) {
     product.setName(product.getName());
     product.setAddress(product.getAddress());
     product.setPrice(product.getPrice());

     productRepository.save(product);
 }
 
 
 @Transactional(readOnly = true)
 public List<Product> getAllProducts() {
     return productRepository.findAll();
 }
 
 
}
