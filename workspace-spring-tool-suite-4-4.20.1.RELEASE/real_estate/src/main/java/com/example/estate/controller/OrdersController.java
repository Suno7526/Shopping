package com.example.estate.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.estate.entity.Likes;
import com.example.estate.entity.Orders;
import com.example.estate.entity.Product;
import com.example.estate.entity.User;
import com.example.estate.service.OrdersService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class OrdersController {

	@Autowired
	private OrdersService ordersService;

	@PostMapping("/orders/add")
    public void ordersProduct(@RequestBody Map<String, Object> requestData) {
        Long userCode = Long.valueOf((Integer) requestData.get("userCode"));
        Long productCode = Long.valueOf((Integer) requestData.get("productCode"));
        String shippingAddress = (String) requestData.get("shippingAddress");

        Orders orders = new Orders();
        User user = new User();
        user.setUserCode(userCode);
        orders.setUser(user);
        Product product = new Product();
        product.setProductCode(productCode);
        orders.setProduct(product);
        orders.setOrderStatus("준비중");
        orders.setRefundReason("X");
        orders.setShippingAddress(shippingAddress);
        ordersService.ordersProduct(orders);
    }

}
