package com.example.estate.entity;

import java.sql.Timestamp;

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
public class Product {

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long productCode;
	
	@ManyToOne
	@JoinColumn(name = "userCode")
	private User user;
	
	@Column
	private String type;
	
	@Column(length = 200)
	private String address;
	
	@Column(nullable = false, length = 50)
	private String name;
	
	@Column
	private double area;
	
	@Column
	private int room;
	
	@Column
	private String transactionType;
	
	@Column(length = 50)
	private int price;
	
	@Column
	private int cost;
	
	@Column
	private Timestamp moveDate;
	
	@Column
	private int floor;
	
	@Column
	private int bathroom;
	
	@Column
	private int parking;
	
	@Column
	private String options;
	
	@Column
	private String image;
	
	@Column
	private Long infomation;
	
	@Column
	private Timestamp createDate;

	@Column
	private Timestamp updatedDate;
	
	@Column
	private Timestamp deletionDate;


}
