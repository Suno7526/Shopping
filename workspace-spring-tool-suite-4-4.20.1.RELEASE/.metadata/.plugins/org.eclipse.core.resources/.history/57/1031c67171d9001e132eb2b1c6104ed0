package com.example.estate.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.example.estate.entity.Product;
import com.example.estate.service.ProductService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {

    @Autowired
    private ProductService productService;

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/saveProduct")
    public ResponseEntity<String> saveProduct(@RequestParam("productImage") MultipartFile productImage,
                                             @RequestParam("productName") String productName,
                                             @RequestParam("infomation") String infomation,
                                             @RequestParam("productPrice") int productPrice) {
        try {
            byte[] imageBytes = productImage.getBytes();
            productService.saveProduct(imageBytes, productName, infomation, productPrice);
            return new ResponseEntity<>("Product saved successfully", HttpStatus.OK);
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>("Failed to save product. Please try again.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{productCode}")
    public ResponseEntity<Product> getProductByCode(@PathVariable("productCode") String productCode) {
        try {
            Long code = Long.parseLong(productCode);
            Product product = productService.getProductByCode(code);
            if (product != null) {
                return new ResponseEntity<>(product, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (NumberFormatException e) {
            // 경로 변수를 Long으로 구문 분석할 수 없는 경우 처리
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/getProducts")
    public ResponseEntity<List<Product>> getProducts() {
        List<Product> productList = productService.getAllProducts();
        return new ResponseEntity<>(productList, HttpStatus.OK);
    }
}
