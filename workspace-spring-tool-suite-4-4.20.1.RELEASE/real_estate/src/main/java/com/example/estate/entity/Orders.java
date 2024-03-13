package com.example.estate.entity;

import java.sql.Timestamp;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Orders {

	

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long orderCode;
	
	@ManyToOne
	@JoinColumn(name = "userCode")
	private User user;
	
	@ManyToOne
	@JoinColumn(name = "productCode")
	private Product product;
	
	@Column
	private int priceSum;
	
	@Column	
    private String refunReason;
	
	@Column	
    private String delRequest;
	
	@Column	
    private int productCount;
	
	@Column	
    private String reZipCode;
	
	@CreationTimestamp
	private Timestamp orderDate;

}
