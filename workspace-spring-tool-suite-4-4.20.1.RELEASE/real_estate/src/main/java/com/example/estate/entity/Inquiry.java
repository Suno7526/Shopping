package com.example.estate.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Inquiry {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long inquiryCode;
	
	@ManyToOne
	@JoinColumn(name = "userCode")
	private User user;
	
	@Column(nullable = false)
	private Long inquiryText;
	
	@Column(nullable = false)
	private String inquiryType;
}
