import express from 'express';
import http from 'http';
import SocketIO from 'socket.io';

import SocketsHandler from './socketsHandler';

let app = express();
let server = http.createServer(app);
let io = SocketIO(server);

app.get('/ping', (_, res) => {
  res.json({ hello: 'world' });
});

const PORT = 3000;
server.listen(PORT);
console.info('Server started at port: ', PORT);

SocketsHandler(io);
