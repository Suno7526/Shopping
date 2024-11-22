package com.example.estate.webSocket;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
@RequestMapping
public class ReactController {

    @GetMapping
    public String redirect(HttpServletRequest request) {
        String requestURI = request.getRequestURI();

        // WebSocket 경로 (/ws로 시작하는 경로)는 제외
        if (requestURI.matches("^ws(/.*)?$")) {
            // WebSocket 경로라면 index.html로 리디렉션하지 않음
            return null;
        }

        // 나머지 모든 경로는 React의 index.html로 리디렉션
        return "forward:/index.html";
    }
}
