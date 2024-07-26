import React, { useState, useEffect } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [stompClient, setStompClient] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const socketFactory = () => new SockJS('http://localhost:8000/ws');
    const client = new Client({
      webSocketFactory: socketFactory,
      reconnectDelay: 5000,
      onConnect: (frame) => {
        console.log('Connected: ' + frame);

        client.subscribe('/topic/messages', (msg) => {
          if (msg.body) {
            setMessages((prevMessages) => [...prevMessages, msg.body]);
          }
        });
      },
      onStompError: (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
      },
    });

    client.activate();
    setStompClient(client);

    return () => {
      if (client) {
        client.deactivate();
      }
    };
  }, []);

  const sendMessage = () => {
    if (stompClient && stompClient.connected) {
      stompClient.publish({ destination: '/app/message', body: message });
      setMessage('');
    } else {
      console.error('There is no underlying STOMP connection');
    }
  };

  return (
    <div>
      <h1>Chat</h1>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
