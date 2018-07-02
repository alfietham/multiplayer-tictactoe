const lobbyQueue = new Map();

const matchPlayers = socket => {
  if (lobbyQueue.size > 0) {
    let peer = lobbyQueue.get(lobbyQueue.keys().next().value);
    // remove peer from queue
    lobbyQueue.delete(peer.id);
    let room = `${socket.id}#${peer.id}`;
    // join them both
    socket.join(room);
    peer.join(room);
    // exchange names between the two of them and start the chat
    peer.emit('joined game success', `JOINED Game with ${socket.id}`);
    socket.emit('joined game success', `JOINED Game with ${peer.id}`);
  } else {
    // lobbyQueue is empty, add to queue
    lobbyQueue.set(socket.id, socket);
    console.log(`${lobbyQueue.size} client(s) waiting for game\n`);
  }
};

const socketsHandler = io => {
  console.log('Waiting for connection...');
  io.on('connection', socketConn => {
    console.log('Client connected:', socketConn.id);

    socketConn.on('joining game', data => {
      console.log('joining game. Finding pair for: ', data);
      matchPlayers(socketConn);
    });

    socketConn.on('game action', data => {
      //TODO: handle this
    });

    socketConn.on('disconnect', () => {
      console.log(`Client disconnected with ID: ${socketConn.id} \n`);
      lobbyQueue.delete(socketConn.id);
    });
  });
};

export default socketsHandler;
