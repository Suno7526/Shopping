package com.example.estate.entity;

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
public class Color {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long colorCode;
	
	@ManyToOne
    @JoinColumn(name = "productCode")
    private Product product;
	
	@Column
	private String colorName;
}
