const { Server } = require('socket.io');

const { Message } = require('./models');
const {
  SOCKET_SERVER_EVENTS: {
    NEW_MESSAGE,
    NEW_MESSAGE_SUCCESS,
    NEW_MESSAGE_ERROR,
    JOIN_ROOM,
    LEAVE_ROOM,
    MESSAGE_IN_ROOM,
  },
} = require('./constants');

function initSocket (httpServer) {
  const cors = { origin: '*' };

  const wsServer = new Server(httpServer, { cors });

  wsServer.on('connection', socket => {
    console.log('Connection established');

    socket.on(NEW_MESSAGE, async payload => {
      try {
        const createdMessage = await Message.create(payload);
        const { room } = payload;
        wsServer.to(room).emit(MESSAGE_IN_ROOM, createdMessage);
        socket.emit(NEW_MESSAGE_SUCCESS, createdMessage);
      } catch (error) {
        socket.emit(NEW_MESSAGE_ERROR, error);
      }
    });

    socket.on(JOIN_ROOM, room => {
      socket.join(room);
      console.log(`User ${socket.id} joined room: ${room}`);
    });

    socket.on(LEAVE_ROOM, room => {
      socket.leave(room);
      console.log(`User ${socket.id} left room: ${room}`);
    });

    socket.on(MESSAGE_IN_ROOM, messageData => {
      const { room, message } = messageData;
      wsServer.to(room).emit('message', { message, createdAt: new Date() });
    });
  });
}

module.exports = initSocket;
