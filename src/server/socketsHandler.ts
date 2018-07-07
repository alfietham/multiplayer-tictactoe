import { handleGameAction, boardState } from './gameMain';

const lobbyQueue = new Map();
const roomNames = new Map();

const addRoomNameToRegistry = (room: String) => {
  room.split('#').map((id: String) => roomNames.set(id, room));
  console.log('roomNames: ', roomNames);
};

const getRoomName = (id: String) => roomNames.get(id);

const matchPlayers: (socket: SocketIO.Socket) => void = socket => {
  if (lobbyQueue.size > 0) {
    let peer = lobbyQueue.get(lobbyQueue.keys().next().value);
    // remove peer from queue
    lobbyQueue.delete(peer.id);
    let room = `${socket.id}#${peer.id}`;
    addRoomNameToRegistry(room);
    // join them both
    socket.join(room);
    peer.join(room);
    // exchange names between the two of them and start the game
    peer.emit('joined game success', 'X');
    socket.emit('joined game success', 'O');
    console.log(`Joined game success: ${socket.id} <-> ${peer.id}\n`);
  } else {
    // lobbyQueue is empty, add to queue
    lobbyQueue.set(socket.id, socket);
    console.log(`${lobbyQueue.size} client(s) waiting for game\n`);
  }
};

const socketsHandler: (io: SocketIO.Server) => void = io => {
  console.log('Waiting for connection...');
  io.on('connection', socketConn => {
    console.log('Client connected:', socketConn.id);

    socketConn.on('joining game', data => {
      console.log('joining game. Finding pair for: ', data);
      matchPlayers(socketConn);
    });

    socketConn.on('game action', ({ id, movePayload }) => {
      handleGameAction(movePayload).then(gameUpdatePayload => {
        io.to(getRoomName(id)).emit('game action response', gameUpdatePayload);
      });
    });

    socketConn.on('get initial state', id => {
      io.to(getRoomName(id)).emit('get initial state response', boardState);
    });

    socketConn.on('disconnect', () => {
      console.log(`Client disconnected with ID: ${socketConn.id} \n`);
      lobbyQueue.delete(socketConn.id);
    });
  });
};

export default socketsHandler;
