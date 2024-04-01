package com.example.estate.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.estate.entity.Cart;
import com.example.estate.entity.User;
import com.example.estate.repository.CartRepository;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    public void addToCart(Cart cart) {
        cartRepository.save(cart);
    }
    
    @Transactional(readOnly = true)
    public Cart findByCartCode(Long cartCode) {
        return cartRepository.findByCartCode(cartCode);
    }
    
    @Transactional(readOnly = true)
    public List<Cart> findByUserCode(Long userCode) {
        return cartRepository.findByUserUserCode(userCode);
    }

}
