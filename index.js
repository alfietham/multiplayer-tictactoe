import express from 'express';
import http from 'http';
import SocketIO from 'socket.io';

import socketsHandler from './socketsHandler';

let app = express();
let server = http.createServer(app);
let io = new SocketIO(server);

app.get('/ping', (req, res) => {
  res.json({ hello: 'world' });
});

const PORT = 3000;
server.listen(PORT);
console.info('Server started at port: ', PORT);

const sockets = socketsHandler(io);
