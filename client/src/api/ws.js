import { io } from 'socket.io-client';
import {
  newMessageError,
  newMessageSuccess,
} from '../store/slices/messagesSlice';

const socketClient = io('ws://localhost:5000'); // conection

export const createMessage = newMessage => {
  socketClient.emit('NEW_MESSAGE', newMessage);
};

export const joinRoom = room => {
  socketClient.emit('JOIN_ROOM', room);
};

export const leaveRoom = room => {
  socketClient.emit('LEAVE_ROOM', room);
};

export const initSocket = store => {
  socketClient.on('NEW_MESSAGE_SUCCESS', payload => {
    store.dispatch(newMessageSuccess(payload));
  });

  socketClient.on('NEW_MESSAGE_ERROR', payload => {
    store.dispatch(newMessageError(payload));
  });

  socketClient.on('MESSAGE', data => {
    console.log('Message received in room:', data);
    store.dispatch(newMessageSuccess(data));
  });
};
