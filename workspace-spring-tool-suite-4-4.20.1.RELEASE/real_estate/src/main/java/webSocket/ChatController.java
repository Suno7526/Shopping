package webSocket;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

@Controller
@CrossOrigin(origins = "http://localhost:3000")
public class ChatController {

    @MessageMapping("/message")
    @SendTo("/topic/messages")
    public String handleMessage(String message) {
        return message;
    }
}
