package com.example.estate.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.estate.dto.ProductDTO;
import com.example.estate.entity.Product;
import com.example.estate.repository.ProductRepository;

@Service
public class ProductService {

 @Autowired
 private ProductRepository productRepository;

 @Transactional
 public void saveProduct(ProductDTO productDTO) {
     Product product = new Product();
     product.setName(productDTO.getName());
     product.setAddress(productDTO.getAddress());
     product.setPrice(productDTO.getPrice());

     productRepository.save(product);
 }
 
 
 @Transactional(readOnly = true)
 public List<Product> getAllProducts() {
     return productRepository.findAll();
 }
 
 
}