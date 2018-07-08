import * as openSocket from 'socket.io-client';
import { MovePayload } from '../../../types/index';

const socket = openSocket(location.origin || 'http://localhost:3000');

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

export const makeMoveSocket = (movePayload: MovePayload) =>
  socket.emit('game action', { id: socket.id, movePayload: movePayload });

export const listenForChanges = () =>
  new Promise(resolve => {
    socket.on('game action response', resolve);
  });

export const handleOtherPlayerDisconnectSocket = () => {
  return new Promise(resolve => {
    socket.on('other player disconnected', resolve);
  });
};
