package com.example.estate.controller;

import java.io.IOException;
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

import com.example.estate.entity.Orders;
import com.example.estate.entity.Product;
import com.example.estate.entity.User;
import com.example.estate.service.OrdersService;
import com.example.estate.service.ProductService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class OrdersController {

	@Autowired
	private OrdersService ordersService;

	@Autowired
	private ProductService productService;

	@PostMapping("/orders/add")
	public void ordersProduct(@RequestBody Map<String, Object> requestData) {
		Long userCode = Long.valueOf((Integer) requestData.get("userCode"));
		Long productCode = Long.valueOf((Integer) requestData.get("productCode"));
		String shippingAddress = (String) requestData.get("shippingAddress");
		String productSize = (String) requestData.get("productSize");
		String productColor = (String) requestData.get("productColor");
		String request = (String) requestData.get("request");
		String customRequest = "";

		Orders orders = new Orders();
		User user = new User();
		user.setUserCode(userCode);
		orders.setUser(user);
		Product product = new Product();
		product.setProductCode(productCode);
		orders.setProductSize(productSize);
		orders.setProductColor(productColor);
		orders.setProduct(product);
		orders.setOrderStatus("준비중");
		orders.setRefundReason("X");
		orders.setShippingAddress(shippingAddress);

		if (request != null && request.equals("기타사항")) {
			customRequest = (String) requestData.get("customRequest");
			orders.setRequest(customRequest);
		} else {
			orders.setRequest(request);
		}

		ordersService.ordersProduct(orders);

	}

	@GetMapping("/getOrdersProduct/{userCode}")
	public ResponseEntity<List<Orders>> getOrders(@PathVariable("userCode") Long userCode) {
		List<Orders> orders = ordersService.findByUserCode(userCode);
		if (!orders.isEmpty()) {
			return new ResponseEntity<>(orders, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@GetMapping("/getOrder/{orderCode}")
    public Orders getOrderDetails(@PathVariable("orderCode") Long orderCode) {
        return ordersService.getOrderDetails(orderCode);
    }

}
