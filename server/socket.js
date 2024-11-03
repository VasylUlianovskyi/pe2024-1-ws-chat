const { Server } = require('socket.io');
const { Message } = require('./models');

function initSocket (httpServer) {
  const cors = { origin: '*' };

  const wsServer = new Server(httpServer, { cors });

  wsServer.on('connection', socket => {
    console.log('Connection established');

    socket.on('NEW_MESSAGE', async payload => {
      try {
        const createdMessage = await Message.create(payload);
        wsServer.emit('NEW_MESSAGE_SUCCESS', createdMessage);
      } catch (error) {
        socket.emit('NEW_MESSAGE_ERROR', error);
      }
    });
  });
}

module.exports = initSocket;
