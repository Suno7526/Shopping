package com.example.estate.controller;

import com.example.estate.entity.Size;
import com.example.estate.service.SizeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/sizes")
public class SizeController {

	@Autowired
	private SizeService sizeService;

	@PostMapping("/add")
	public ResponseEntity<Size> addSize(@RequestBody Size size) {
		Size newSize = sizeService.addSize(size);
		return new ResponseEntity<>(newSize, HttpStatus.CREATED);
	}

}
