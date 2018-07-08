import {
  computeWinner,
  isBoardFull,
  initialBoardState,
  isValidMove,
  updateBoard,
} from './gameUtils';
import {
  MovePayload,
  GameState,
  GameInGamesList,
} from '../../types/index';

let gamesList: GameInGamesList[] = [];

export const createNewGame = (roomName: string) =>
  gamesList.push({
    roomName: roomName,
    currentBoardState: initialBoardState.gameBoard.slice(),
  });

const fetchGameFromList = (roomName: string) =>
  gamesList.find(game => game.roomName === roomName);

export const deleteRoomsGame = roomName => {
  let deleteIndex = gamesList.findIndex(game => game.roomName === roomName);
  if (deleteIndex > -1) {
    gamesList.splice(deleteIndex, 1);
  }
};

export const handleGameAction: (
  payload: MovePayload,
  roomName: string
) => Promise<GameState> = (payload, roomName) => {
  let { player, move } = payload;
  let currentBoard = fetchGameFromList(roomName).currentBoardState;
  let nextTurn = player;
  if (isValidMove(currentBoard, move)) {
    updateBoard(currentBoard, payload);
    nextTurn = player === 'X' ? 'O' : 'X';
  }

  return new Promise(resolve => {
    resolve({
      gameBoard: currentBoard,
      winner: computeWinner(currentBoard),
      nextTurn: nextTurn,
      isBoardFull: isBoardFull(currentBoard),
    });
  });
};
