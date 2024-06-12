package com.example.estate.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.estate.entity.Orders;
import com.example.estate.repository.OrdersRepository;

@Service
public class OrdersService {

	@Autowired
    private OrdersRepository ordersRepository;
	
	public void ordersProduct(Orders orders) {
		ordersRepository.save(orders);
    }
	
	@Transactional(readOnly = true)
    public List<Orders> findByUserCode(Long userCode) {
        return ordersRepository.findByUserUserCode(userCode);
    }
}
