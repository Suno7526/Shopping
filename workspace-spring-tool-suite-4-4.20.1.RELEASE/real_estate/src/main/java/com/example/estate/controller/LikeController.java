package com.example.estate.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.estate.entity.Likes;
import com.example.estate.entity.Product;
import com.example.estate.entity.User;
import com.example.estate.service.LikeService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class LikeController {

    @Autowired
    private LikeService likeService;

    @PostMapping("/like")
	public void likeProduct(@RequestBody Map<String, Long> requestData) {
    	
	    Long userCode = requestData.get("userCode");
	    Long productCode = requestData.get("productCode");
	    Likes like = new Likes();
	    User user = new User(); // 사용자 정보 설정
	    user.setUserCode(userCode);
	    like.setUser(user);
	    Product product = new Product(); // 상품 정보 설정
	    product.setProductCode(productCode);
	    like.setProduct(product);
	    likeService.likeProduct(like);
	}
}