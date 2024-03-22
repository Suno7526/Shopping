package com.example.estate.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long productCode;

    @Column(nullable = false)
    private String productName;

    @Column
    private int productPrice;

    @Column(nullable = false)
    private String infomation;

    @Column
    private int productStuck;

    @Column
    private String companyName;
    
    @Column
    private int viewCount;

    @Column(columnDefinition = "LONGBLOB")
    private byte[] productImage;

}
