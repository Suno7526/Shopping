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
public class Address {

	

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long addressCode;
	
	@ManyToOne
	@JoinColumn(name = "userCode")
	private User user;
	
	@Column
	private String zipCode;
	
	@Column	
    private String address;
	
	

	public Long getAddressCode() {
		return addressCode;
	}

	public void setAddressCode(Long addressCode) {
		this.addressCode = addressCode;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public String getZipCode() {
		return zipCode;
	}

	public void setZipCode(String zipCode) {
		this.zipCode = zipCode;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}
	
	
}