package com.example.estate.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.estate.entity.Product;
import com.example.estate.service.ProductService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {

    @Autowired
    private ProductService productService;

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/saveProduct")
    public ResponseEntity<String> saveProduct(@RequestBody Product product) {
        productService.saveProduct(product);
        return new ResponseEntity<>("Product saved successfully", HttpStatus.OK);
    }
    
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/getProducts")
    public ResponseEntity<List<Product>> getProducts() {
        List<Product> productList = productService.getAllProducts();
        return new ResponseEntity<>(productList, HttpStatus.OK);
    }
    
}
