import * as openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:3000');

const onConnect = () => {
  console.log('connected as ' + socket.id);
};

const onDisconnect = (reason: String) => {
  console.log('disconnected. Reason: ' + reason);
};

export const connectSocket = () => {
  console.log('init');

  socket.on('connect', onConnect);
  socket.on('disconnect', onDisconnect);
};

export const disconnectSocket = () => socket.close();

export const joiningGameSocket = () => {
  socket.emit('joining game', socket.id);
  return new Promise(resolve => {
    socket.on('joined game success', resolve);
  });
};
