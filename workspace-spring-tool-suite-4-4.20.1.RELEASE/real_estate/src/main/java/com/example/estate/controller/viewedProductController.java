package com.example.estate.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.estate.dto.UserProduct;
import com.example.estate.entity.Cart;
import com.example.estate.entity.Product;
import com.example.estate.entity.User;
import com.example.estate.entity.ViewedProduct;
import com.example.estate.service.ProductService;
import com.example.estate.service.UserService;
import com.example.estate.service.ViewedProductService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class viewedProductController {

    @Autowired
    private UserService userService;

    @Autowired
    private ProductService productService;

    @Autowired
    private ViewedProductService viewedProductService;

    @PostMapping("/saveViewedProduct")
    public ResponseEntity<String> saveViewedProduct(@RequestBody UserProduct request) {
        try {
            User user = userService.findByUserCode(request.getUserCode());
            Product product = productService.findByProductCode(request.getProductCode());

            if (user != null && product != null) {
                // 상품 조회 기록 저장
                viewedProductService.saveViewedProduct(user, product);
                // 상품 조회 수 증가
                productService.incrementViewCount(product);
                return ResponseEntity.ok("상품을 성공적으로 저장했습니다.");
            } else {
                return ResponseEntity.badRequest().body("사용자 또는 상품을 찾을 수 없습니다.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("상품을 저장하는 중에 오류가 발생했습니다.");
        }
    }
    
    @GetMapping("/getViewedProduct/{userCode}")
    public ResponseEntity<List<ViewedProduct>> getViewedProducts(@PathVariable("userCode") Long userCode) {
        List<ViewedProduct> viewedProducts = viewedProductService.findRecentViewedProducts(userCode, 10); // 최근에 본 10개의 상품 가져오기
        if (!viewedProducts.isEmpty()) {
            return new ResponseEntity<>(viewedProducts, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
