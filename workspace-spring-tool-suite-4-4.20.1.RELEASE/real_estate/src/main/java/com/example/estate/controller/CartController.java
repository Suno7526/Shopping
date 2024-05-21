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
import com.example.estate.entity.Product;
import com.example.estate.entity.User;
import com.example.estate.service.CartService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class CartController {

	@Autowired
	private CartService cartService;

	@PostMapping("/addToCart")
	public void addToCart(@RequestBody Map<String, Long> requestData) {
		Long userCode = requestData.get("userCode");
		Long productCode = requestData.get("productCode");

		Cart cart = new Cart();
		User user = new User();
		user.setUserCode(userCode);
		cart.setUser(user);

		Product product = new Product();
		product.setProductCode(productCode);
		cart.setProduct(product);

		cartService.addToCart(cart);
	}

	@GetMapping("/getCartProduct/{userCode}")
	public ResponseEntity<List<Cart>> getCarts(@PathVariable("userCode") Long userCode) {
		List<Cart> carts = cartService.findByUserCode(userCode);
		if (!carts.isEmpty()) {
			return new ResponseEntity<>(carts, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("/deleteCartItem/{userCode}/{productCode}")
	public ResponseEntity<Void> deleteCartItem(@PathVariable("userCode") Long userCode, @PathVariable("productCode") Long productCode) {
	    try {
	        cartService.deleteCartItem(userCode, productCode);
	        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	    } catch (Exception e) {
	        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	}
}

