import axios from 'axios';
import { io } from 'socket.io-client';

const axiosOptions = {
  baseURL: 'http://127.0.0.1:5000/api',
};

const apiInstance = axios.create(axiosOptions);

export const getMessages = limit => apiInstance.get(`/messages?limit=${limit}`);

export const createMessage = newMessage =>
  apiInstance.post('/messages', newMessage);

//========

const socketClient = io('ws://localhost:5000'); // conection

socketClient.on('HELLO_TO_ME', () => {
  console.log('Hello in our chat');
});

socketClient.on('NEW_PARTICIPANT', () => {
  console.log('New perticipant joined');
});

socketClient.on('CHAT_WILL_CLOSED', () => {
  console.log('We will closed in a few minutes');
});

socketClient.emit('SEND_TO_SERVER', 'Message');
