package com.example.estate.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.estate.entity.Orders;
import com.example.estate.repository.OrdersRepository;
import Search.OrdersSpecifications;

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
	
	@Transactional(readOnly = true)
	public Orders getOrderDetails(Long orderCode) {
        return ordersRepository.findByOrderCode(orderCode);
    }
	
	public List<Orders> getNonInitialRefundOrders() {
        return ordersRepository.findByRefundStateNot("신청 전");
    }

	public Orders updateOrder(Long orderCode, Orders updatedOrder) {
	    Orders existingOrder = ordersRepository.findById(orderCode)
	        .orElseThrow(() -> new RuntimeException("Order not found"));
	    
	    if (updatedOrder.getShippingAddress() != null) {
	        existingOrder.setShippingAddress(updatedOrder.getShippingAddress());
	    }
	    if (updatedOrder.getOrderStatus() != null) {
	        existingOrder.setOrderStatus(updatedOrder.getOrderStatus());
	    }
	    if (updatedOrder.getRefundReason() != null) {
	        existingOrder.setRefundReason(updatedOrder.getRefundReason());
	    }
	    if (updatedOrder.getRequest() != null) {
	        existingOrder.setRequest(updatedOrder.getRequest());
	    }
	    if (updatedOrder.getOrderPrice() != 0) {  // assuming orderPrice is a primitive type, check for non-default value
	        existingOrder.setOrderPrice(updatedOrder.getOrderPrice());
	    }
	    if (updatedOrder.getRefundState() != null) {
	        existingOrder.setRefundState(updatedOrder.getRefundState());
	    }
	    if (updatedOrder.getProductSize() != null) {
	        existingOrder.setProductSize(updatedOrder.getProductSize());
	    }
	    if (updatedOrder.getProductColor() != null) {
	        existingOrder.setProductColor(updatedOrder.getProductColor());
	    }
	    existingOrder.setReviewCheck(updatedOrder.isReviewCheck());
	    if (updatedOrder.getImpUid() != null) {
	        existingOrder.setImpUid(updatedOrder.getImpUid());
	    }

	    return ordersRepository.save(existingOrder);
	}


    @Transactional(readOnly = true)
    public List<Orders> searchOrders(Long orderCode, Long userCode, Long productCode, String shippingAddress, String orderStatus, String refundReason, String request, String orderPrice, String refundState, String productSize, String productColor, Boolean reviewCheck, String impUid) {
        Specification<Orders> spec = Specification.where(null);

        if (orderCode != null) {
            spec = spec.and(OrdersSpecifications.hasOrderCode(orderCode));
        }
        if (userCode != null) {
            spec = spec.and(OrdersSpecifications.hasUserCode(userCode));
        }
        if (productCode != null) {
            spec = spec.and(OrdersSpecifications.hasProductCode(productCode));
        }
        if (shippingAddress != null && !shippingAddress.isEmpty()) {
            spec = spec.and(OrdersSpecifications.hasShippingAddress(shippingAddress));
        }
        if (orderStatus != null && !orderStatus.isEmpty()) {
            spec = spec.and(OrdersSpecifications.hasOrderStatus(orderStatus));
        }
        if (refundReason != null && !refundReason.isEmpty()) {
            spec = spec.and(OrdersSpecifications.hasRefundReason(refundReason));
        }
        if (request != null && !request.isEmpty()) {
            spec = spec.and(OrdersSpecifications.hasRequest(request));
        }
        if (orderPrice != null && !orderPrice.isEmpty()) {
            spec = spec.and(OrdersSpecifications.hasOrderPrice(orderPrice));
        }
        if (refundState != null && !refundState.isEmpty()) {
            spec = spec.and(OrdersSpecifications.hasRefundState(refundState));
        }
        if (productSize != null && !productSize.isEmpty()) {
            spec = spec.and(OrdersSpecifications.hasProductSize(productSize));
        }
        if (productColor != null && !productColor.isEmpty()) {
            spec = spec.and(OrdersSpecifications.hasProductColor(productColor));
        }
        if (reviewCheck != null) {
            spec = spec.and(OrdersSpecifications.hasReviewCheck(reviewCheck));
        }
        if (impUid != null && !impUid.isEmpty()) {
            spec = spec.and(OrdersSpecifications.hasImpUid(impUid));
        }

        return ordersRepository.findAll(spec);
    }
}
