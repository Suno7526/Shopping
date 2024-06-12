package com.example.estate.controller;

import java.io.IOException;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.estate.entity.Product;
import com.example.estate.repository.CartRepository;
import com.example.estate.repository.ProductRepository;
import com.siot.IamportRestClient.IamportClient;
import com.siot.IamportRestClient.exception.IamportResponseException;
import com.siot.IamportRestClient.response.IamportResponse;
import com.siot.IamportRestClient.response.Payment;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class PaymentController {

    @Value("${iamport.key}")
    private String restApiKey;
    @Value("${iamport.secret}")
    private String restApiSecret;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CartRepository cartRepository;

    @Bean
    public IamportClient iamportClient() {
        return new IamportClient(restApiKey, restApiSecret);
    }

    @PostMapping("/verifyIamport/{imp_uid}")
    public IamportResponse<Payment> paymentByImpUid(
        @PathVariable("imp_uid") String imp_uid,
        @RequestBody Map<String, Long> requestData
    ) throws IamportResponseException, IOException {
        IamportClient iamportClient = iamportClient(); // iamportClient 빈을 직접 사용
        IamportResponse<Payment> response = iamportClient.paymentByImpUid(imp_uid);

        // 결제 성공 시 상품 재고 업데이트 및 장바구니에서 상품 삭제
        if (response.getCode() == 0) {
            Payment payment = response.getResponse();
            Long productCode = requestData.get("productCode"); // 프론트에서 받은 productCode
            Long userCode = requestData.get("userCode"); // 프론트에서 받은 userCode

            // 상품 재고 업데이트
            Product product = productRepository.findByProductCode(productCode);
            if (product != null) {
            	product.setDeliveryStatus("상품 준비중");
                productRepository.save(product);
            }

            // 장바구니에서 상품 삭제
            cartRepository.deleteByUser_UserCodeAndProduct_ProductCode(userCode, productCode);
        }

        return response;
    }
}
	