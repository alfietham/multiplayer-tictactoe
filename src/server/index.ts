import express from 'express';
import http from 'http';
import SocketIO from 'socket.io';
import path from 'path';

import SocketsHandler from './socketsHandler';

let app = express();
let server = http.createServer(app);
let io = SocketIO(server);

app.get('/ping', (_, res) => {
  res.json({ pong: 'ok' });
});

app.get('/', (_, res) => {
  res.sendFile(path.resolve(__dirname, '../app/index.html'));
});

app.get('/resources/:req_resource', (req, res) => {
  switch (req.params.req_resource) {
    case 'scripts':
      res.sendFile(path.resolve(__dirname, '../../dist/app/bundle.js'));
      break;
    case 'styles':
      res.sendFile(path.resolve(__dirname, '../app/styles.css'));
      break;
    default:
      res.sendStatus(404);
      break;
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT);
console.info(`[INFO] Server started at port: ${PORT}`);

SocketsHandler(io);
