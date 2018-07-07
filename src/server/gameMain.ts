import { computeWinner, isBoardFull } from './gameUtils';
import { MovePayload, GameBoxContent, GameState } from '../../types/index';

export const boardState: GameState = {
  currentGameBoard: [null, null, null, null, null, null, null, null, null],
  nextTurn: 'X',
  winner: null,
  isBoardFull: false,
};

const updateBoard: (payload: MovePayload) => GameBoxContent[] = ({
  move,
  player,
}) => {
  boardState.currentGameBoard[move] = player;
  return boardState.currentGameBoard;
};

export const handleGameAction: (
  payload: MovePayload
) => Promise<GameState> = ({ move, player }) => {
  let currentBoard = boardState.currentGameBoard;
  let winnerIs = computeWinner(currentBoard);

  return new Promise(resolve => {
    // No change if box has been selected, or winner is found
    if (currentBoard[move] || winnerIs) {
      resolve({
        currentGameBoard: currentBoard,
        winner: winnerIs,
        nextTurn: player === 'X' ? 'O' : 'X',
        isBoardFull: isBoardFull(currentBoard),
      });
    }
    // Otherwise, next turn
    resolve({
      currentGameBoard: updateBoard({ move, player }),
      winner: winnerIs,
      nextTurn: player === 'X' ? 'O' : 'X',
      isBoardFull: isBoardFull(currentBoard),
    });
  });
};
