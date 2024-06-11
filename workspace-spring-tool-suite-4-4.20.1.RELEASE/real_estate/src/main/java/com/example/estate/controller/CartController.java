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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.estate.entity.Cart;
import com.example.estate.entity.Product;
import com.example.estate.entity.User;
import com.example.estate.repository.CartRepository;
import com.example.estate.service.CartService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class CartController {

	@Autowired
	private CartService cartService;
	
	@Autowired
    private CartRepository cartRepository;

	@PostMapping("/addToCart")
	public ResponseEntity<Void> addToCart(@RequestBody Map<String, Object> requestData) {
        try {
            Long userCode = Long.parseLong(requestData.get("userCode").toString());
            Long productCode = Long.parseLong(requestData.get("productCode").toString());
            String cartSize = (String) requestData.get("cartSize");
            String cartColor = (String) requestData.get("cartColor");

            Cart cart = new Cart();
            User user = new User();
            user.setUserCode(userCode);
            cart.setUser(user);

            Product product = new Product();
            product.setProductCode(productCode);
            cart.setProduct(product);

            cart.setCartSize(cartSize);
            cart.setCartColor(cartColor);
            System.out.println(cartColor);
            System.out.println(cartSize);
            cartService.addToCart(cart);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (NumberFormatException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
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
	public ResponseEntity<Void> deleteCartItem(@PathVariable("userCode") Long userCode,
			@PathVariable("productCode") Long productCode) {
		try {
			cartService.deleteCartItem(userCode, productCode);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/cart/{userCode}")
    public List<Cart> getCart(@PathVariable("userCode") Long userCode) {
        return cartRepository.findByUserUserCode(userCode);
    }
}
