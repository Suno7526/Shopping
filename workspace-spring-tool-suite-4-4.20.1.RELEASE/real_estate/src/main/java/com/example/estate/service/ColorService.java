package com.example.estate.service;

import com.example.estate.entity.Color;
import com.example.estate.repository.ColorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ColorService {

	@Autowired
	private ColorRepository colorRepository;

	public Color addColor(Color color) {
		return colorRepository.save(color);
	}

}
