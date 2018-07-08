"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _gameMain = require("./gameMain");

var lobbyQueue = new Map();
var roomNames = new Map();

var addRoomNameToRegistry = function addRoomNameToRegistry(room) {
  room.split('#').map(function (id) {
    return roomNames.set(id, room);
  });
  console.log('roomNames: ', roomNames);
};

var getRoomName = function getRoomName(id) {
  return roomNames.get(id);
};

var matchPlayers = function matchPlayers(socket) {
  if (lobbyQueue.size > 0) {
    var peer = lobbyQueue.get(lobbyQueue.keys().next().value); // remove peer from queue

    lobbyQueue.delete(peer.id);
    var room = "".concat(socket.id, "#").concat(peer.id);
    addRoomNameToRegistry(room); // join them both

    socket.join(room);
    peer.join(room); // exchange names between the two of them and start the game

    peer.emit('joined game success', 'X');
    socket.emit('joined game success', 'O');
    console.log("Joined game success: ".concat(socket.id, " <-> ").concat(peer.id, "\n"));
  } else {
    // lobbyQueue is empty, add to queue
    lobbyQueue.set(socket.id, socket);
    console.log("".concat(lobbyQueue.size, " client(s) waiting for game\n"));
  }
};

var socketsHandler = function socketsHandler(io) {
  console.log('Waiting for connection...');
  io.on('connection', function (socketConn) {
    console.log('Client connected:', socketConn.id);
    socketConn.on('joining game', function (data) {
      console.log('joining game. Finding pair for: ', data);
      matchPlayers(socketConn);
    });
    socketConn.on('game action', function (_ref) {
      var id = _ref.id,
          movePayload = _ref.movePayload;
      (0, _gameMain.handleGameAction)(movePayload).then(function (gameUpdatePayload) {
        io.to(getRoomName(id)).emit('game action response', gameUpdatePayload);
      });
    });
    socketConn.on('disconnect', function () {
      console.log("Client disconnected with ID: ".concat(socketConn.id, " \n"));
      lobbyQueue.delete(socketConn.id);
    });
  });
};

var _default = socketsHandler;
exports.default = _default;