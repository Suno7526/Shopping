package com.example.estate.controller;

import java.io.IOException;
import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.estate.entity.Product;
import com.example.estate.service.ProductService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {

    @Autowired
    private ProductService productService;

    @PostMapping("/saveProduct")
    public ResponseEntity<String> saveProduct(@RequestParam("productImages") List<MultipartFile> productImages,
                                              @RequestParam("productName") String productName,
                                              @RequestParam("information") String information,
                                              @RequestParam("productPrice") int productPrice,
                                              @RequestParam("companyName") String companyName,
                                              @RequestParam("productStuck") int productStuck,
                                              @RequestParam("category") String category,
                                              @RequestParam(value = "discountRate", required = false, defaultValue = "0") Integer discountRate) {
        try {
            productService.saveProduct(productImages, productName, information, productPrice, companyName, productStuck, category, discountRate);
            return new ResponseEntity<>("상품 등록 성공", HttpStatus.OK);
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>("상품 등록에 실패했습니다 다시 시도해주세요.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("/getProductImage/{productCode}")
    public ResponseEntity<byte[]> getProductImage(@PathVariable("productCode") Long productCode) {
        try {
            List<byte[]> imageBytes = productService.getProductImages(productCode);
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.IMAGE_JPEG); // 또는 MediaType.IMAGE_PNG
            return new ResponseEntity<>(imageBytes.get(0), headers, HttpStatus.OK); // 첫 번째 이미지 바이트 배열을 반환하는 것으로 가정
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getProductImages/{productCode}")
    public ResponseEntity<List<String>> getProductImages(@PathVariable("productCode") Long productCode) {
        try {
            List<byte[]> imageBytesList = productService.getProductImages(productCode);
            List<String> base64Images = imageBytesList.stream()
                    .map(imageBytes -> Base64.getEncoder().encodeToString(imageBytes))
                    .collect(Collectors.toList());
            return new ResponseEntity<>(base64Images, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getProducts")
    public ResponseEntity<List<Product>> getProducts() {
        List<Product> productList = productService.getAllProducts();
        return new ResponseEntity<>(productList, HttpStatus.OK);
    }

    @GetMapping("/getProduct/{productCode}") // 새로운 엔드포인트 추가
    public ResponseEntity<Product> getProduct(@PathVariable("productCode") Long productCode) {
        Product product = productService.findByProductCode(productCode);
        if (product != null) {
            return new ResponseEntity<>(product, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }	
    }

    @GetMapping("/category/{category}")
    public List<Product> getProductsByCategory(@PathVariable("category") String category) {
        return productService.getProductsByCategory(category);
    }

    @PutMapping("/updateProduct/{productCode}")
    public ResponseEntity<String> updateProduct(@PathVariable("productCode") Long productCode,
                                                @RequestBody Product updatedProduct) {

        try {
            boolean isUpdated = productService.updateProduct(productCode, updatedProduct);
            if (isUpdated) {
                return new ResponseEntity<>("상품 수정 성공", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("상품을 찾을 수 없습니다.", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("상품 수정 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/searchProducts/{query}") // 메뉴바 검색
    public List<Product> searchProducts(@PathVariable("query") String query) {
        return productService.searchProducts1(query);
    }

    @GetMapping("/search") // productUpdate 페이지 검색
    public ResponseEntity<List<Product>> searchProducts(
            @RequestParam(value = "productCode", required = false) Long productCode,
            @RequestParam(value = "productName", required = false) String productName,
            @RequestParam(value = "companyName", required = false) String companyName,
            @RequestParam(value = "productStock", required = false) Integer productStock,
            @RequestParam(value = "productPrice", required = false) Integer productPrice,
            @RequestParam(value = "category", required = false) String category,
            @RequestParam(value = "discountRate", required = false) Integer discountRate) {
        List<Product> products = productService.searchProducts2(productCode, productName, companyName, productStock, productPrice, category, discountRate);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @GetMapping("/recommendProducts/{userCode}")
    public ResponseEntity<List<Product>> recommendProducts(@PathVariable("userCode") Long userCode) {
        List<Product> recommendedProducts = productService.recommendProducts(userCode);
        return new ResponseEntity<>(recommendedProducts, HttpStatus.OK);
    }
    
    @PutMapping("/updateContent/{productCode}")
    public ResponseEntity<String> updateContent(@PathVariable("productCode") Long productCode, @RequestBody String productContent) {
        try {
            boolean isUpdated = productService.updateProductContent(productCode, productContent);
            if (isUpdated) {
                return new ResponseEntity<>("상품 내용 수정 성공", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("상품을 찾을 수 없습니다.", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("상품 내용 수정 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    
    }

    
