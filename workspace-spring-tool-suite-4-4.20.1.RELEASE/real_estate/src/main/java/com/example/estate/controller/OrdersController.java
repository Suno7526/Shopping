package com.example.estate.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.estate.entity.Cart;
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

	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping("/getOrdersProduct/{userCode}")
	public ResponseEntity<List<Orders>> getOrders(@PathVariable("userCode") Long userCode) {
	    List<Orders> orders = ordersService.findByUserCode(userCode);
	    if (!orders.isEmpty()) {
	        return new ResponseEntity<>(orders, HttpStatus.OK);
	    } else {
	        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	    }
	}
}
