import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const client = new Client({
  brokerURL: 'ws://localhost:8000/ws',
  connectHeaders: {
    login: 'user',
    passcode: 'password',
  },
  debug: function (str) {
    console.log(str);
  },
  reconnectDelay: 5000,
  heartbeatIncoming: 4000,
  heartbeatOutgoing: 4000,
  webSocketFactory: function () {
    return new SockJS('ws://localhost:8000/ws');
  },
});

export default client;
