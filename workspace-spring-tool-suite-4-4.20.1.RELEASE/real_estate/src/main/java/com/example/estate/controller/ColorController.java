package com.example.estate.controller;

import com.example.estate.entity.Color;
import com.example.estate.service.ColorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/colors")
public class ColorController {

	@Autowired
	private ColorService colorService;

	@PostMapping("/add")
	public ResponseEntity<Color> addColor(@RequestBody Color color) {
		Color newColor = colorService.addColor(color);
		return new ResponseEntity<>(newColor, HttpStatus.CREATED);
	}

	
}
