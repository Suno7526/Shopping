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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
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
        String impUid = (String) requestData.get("impUid");
        
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
        orders.setRequest(request);
        orders.setImpUid(impUid);
        
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

    @GetMapping("/getNonInitialRefundOrders")
    public ResponseEntity<List<Orders>> getNonInitialRefundOrders() {
        List<Orders> orders = ordersService.getNonInitialRefundOrders();
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @PutMapping("/updateOrder/{orderCode}")
    public Orders updateOrder(@PathVariable("orderCode") Long orderCode, @RequestBody Orders updatedOrder) {
        return ordersService.updateOrder(orderCode, updatedOrder);
    }

    @GetMapping("/orderSearch")
    public List<Orders> searchOrders(
            @RequestParam(required = false) Long orderCode,
            @RequestParam(required = false) Long userCode,
            @RequestParam(required = false) Long productCode,
            @RequestParam(required = false) String shippingAddress,
            @RequestParam(required = false) String orderStatus,
            @RequestParam(required = false) String refundReason,
            @RequestParam(required = false) String request,
            @RequestParam(required = false) String orderPrice,
            @RequestParam(required = false) String refundState,
            @RequestParam(required = false) String productSize,
            @RequestParam(required = false) String productColor,
            @RequestParam(required = false) Boolean reviewCheck,
            @RequestParam(required = false) String impUid) {
        return ordersService.searchOrders(orderCode, userCode, productCode, shippingAddress, orderStatus, refundReason, request, orderPrice, refundState, productSize, productColor, reviewCheck, impUid);
    }
    
}
