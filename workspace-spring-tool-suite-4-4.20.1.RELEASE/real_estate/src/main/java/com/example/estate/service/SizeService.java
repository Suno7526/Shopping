package com.example.estate.service;

import com.example.estate.entity.Size;
import com.example.estate.repository.SizeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SizeService {

	@Autowired
	private SizeRepository sizeRepository;

	public Size addSize(Size size) {
		return sizeRepository.save(size);
	}

}
