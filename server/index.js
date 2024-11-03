const http = require('http');
const { Server } = require('socket.io');
const app = require('./app');

const PORT = process.env.PORT ?? 5000;

const httpServer = http.createServer(app);

// ---------------

const cors = { origin: '*' };

const wsServer = new Server(httpServer, { cors });

wsServer.on('connection', socket => {
  console.log('Connection established');
  socket.emit('HELLO_TO_ME');

  socket.broadcast.emit('NEW_PARTICIPANT');

  wsServer.emit('CHAT_WILL_CLOSED');

  socket.on('SEND_TO_SERVER', message => {
    console.log('From client:', message);
  });
});

//--------------

httpServer.listen(PORT, () => {
  console.log(`Server is running!`);
});
