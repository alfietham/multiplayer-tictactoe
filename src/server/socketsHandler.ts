import { 
  handleGameAction, 
  createNewGame, 
  deleteRoomsGame, 
  handleRematch 
} from './gameMain';

interface RoomNames {
  ids: string[];
  name: string;
}

const lobbyQueue = new Map();
const roomNames: RoomNames[] = [];

const addRoomNameToRegistry = (room: string) =>
  roomNames.push({ ids: room.split('#'), name: room });

const findRoomThatHasId = (id: string) => (room: RoomNames) =>
  room.ids.includes(id);

const getRoomName = (id: string) =>
  roomNames.find(findRoomThatHasId(id)) &&
  roomNames.find(findRoomThatHasId(id)).name;

const deleteRoom = (id: string) => {
  let deleteIndex = roomNames.findIndex(findRoomThatHasId(id));
  if (deleteIndex > -1) {
    roomNames.splice(deleteIndex, 1);
  }
};

const matchPlayers: (socket: SocketIO.Socket) => void = socket => {
  if (lobbyQueue.size > 0) {
    let peer = lobbyQueue.get(lobbyQueue.keys().next().value);
    // remove peer from queue
    lobbyQueue.delete(peer.id);
    let room = `${socket.id}#${peer.id}`;
    addRoomNameToRegistry(room);
    createNewGame(room);
    // join them both
    socket.join(room);
    peer.join(room);
    // exchange names between the two of them and start the game
    peer.emit('joined game success', 'X');
    socket.emit('joined game success', 'O');
    console.info(`[INFO] Joined game success: ${socket.id} <-> ${peer.id}\n`);
    console.info(`[INFO] ${roomNames.length} room(s) active\n`);
  } else {
    // lobbyQueue is empty, add to queue
    lobbyQueue.set(socket.id, socket);
    console.info(`[INFO] ${lobbyQueue.size} client(s) waiting for game\n`);
  }
};

const handleClientDisconnectOnServer = socketConn => {
  lobbyQueue.delete(socketConn.id);
  deleteRoomsGame(getRoomName(socketConn.id));
  deleteRoom(socketConn.id);
};

const socketsHandler: (io: SocketIO.Server) => void = io => {
  console.info('[INFO] Waiting for connection...');
  io.on('connection', socketConn => {
    console.info('[INFO] Client connected:', socketConn.id);

    socketConn.on('joining game', data => {
      console.info('[INFO] joining game. Finding pair for: ', data);
      matchPlayers(socketConn);
    });

    socketConn.on('game action', ({ id, movePayload }) => {
      let roomName = getRoomName(id);
      // if room no longer exists, don't proceed
      if (roomName) {
        handleGameAction(movePayload, roomName).then(gameUpdatePayload => {
          io.to(getRoomName(id)).emit(
            'update game state',
            gameUpdatePayload
          );
        });
      }
    });

    socketConn.on('iniitate rematch', (id) => {
      let roomName = getRoomName(id);
      console.info(`[INFO] Initiating rematch for room: ${roomName} \n`);
      // if room no longer exists, don't proceed
      if (roomName) {
        handleRematch(roomName).then(newGameState => {
          io.to(roomName).emit(
            'update game state',
            newGameState
          );
        });
      }
    });

    socketConn.on('disconnect', () => {
      console.info(`[INFO] Client disconnected with ID: ${socketConn.id} \n`);
      io.to(getRoomName(socketConn.id)).emit('other player disconnected');
      handleClientDisconnectOnServer(socketConn);
    });
  });
};

export default socketsHandler;
