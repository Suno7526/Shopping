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
public class Cart {

	

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long cartCode;
	
	@ManyToOne
	@JoinColumn(name = "userCode")
	private User user;
	
	@ManyToOne
	@JoinColumn(name = "productCode")
	private Product product;
	
	@Column
	private int cartProductCount;

	public Long getProductCode() {
		return cartCode;
	}

	public void setCartCode(Long cartCode) {
		this.cartCode = cartCode;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	public int getCartProductCount() {
		return cartProductCount;
	}

	public void setCartProductCount(int cartProductCount) {
		this.cartProductCount = cartProductCount;
	}
	
	
	
}
