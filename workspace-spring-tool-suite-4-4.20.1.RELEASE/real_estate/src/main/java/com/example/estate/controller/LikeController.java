package com.example.estate.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.estate.entity.Cart;
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

	@GetMapping("/getLikeProduct/{userCode}")
	public ResponseEntity<List<Likes>> getCarts(@PathVariable("userCode") Long userCode) {
	    List<Likes> likes = likeService.findByUserCode(userCode);
	    if (!likes.isEmpty()) {
	        return new ResponseEntity<>(likes, HttpStatus.OK);
	    } else {
	        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	    }
	}
	
	@DeleteMapping("/unlikeProduct/{userCode}/{productCode}")
	public ResponseEntity<Void> unlikeProduct(@PathVariable("userCode") Long userCode, @PathVariable("productCode") Long productCode) {
	    try {
	        likeService.unlikeProduct(userCode, productCode);
	        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	    } catch (Exception e) {
	        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	}
	
}