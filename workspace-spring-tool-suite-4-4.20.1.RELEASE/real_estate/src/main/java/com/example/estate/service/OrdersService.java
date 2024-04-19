package com.example.estate.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.estate.entity.Likes;
import com.example.estate.entity.Orders;
import com.example.estate.repository.OrdersRepository;

@Service
public class OrdersService {

	@Autowired
    private OrdersRepository ordersRepository;
	
	public void ordersProduct(Orders orders) {
		ordersRepository.save(orders);
    }
}
