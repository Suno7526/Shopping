package com.example.estate.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
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
}
