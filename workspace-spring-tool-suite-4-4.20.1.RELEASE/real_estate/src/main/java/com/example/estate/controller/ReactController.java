package com.example.estate.controller;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
@Controller
public class ReactController {
    @RequestMapping(value = "/{path:[^\\.]*}")
    public String redirect() {
        // 모든 경로를 React의 index.html로 리디렉션
        return "forward:/index.html";
    }
}