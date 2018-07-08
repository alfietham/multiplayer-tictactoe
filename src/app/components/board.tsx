import * as React from 'react';

import Square from './square';
import { HandleClick, GameState } from '../../../types/index';

const Board: (
  {
    handleClick,
    gameBoard,
  }: {
    handleClick: HandleClick;
    gameBoard: GameState['gameBoard'];
  }
) => JSX.Element = ({ handleClick, gameBoard }) => {
  let boardIndices = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <div className="board">
      {boardIndices.map(index => (
        <Square
          key={index}
          content={gameBoard[index]}
          handleClick={() => handleClick(index)}
        />
      ))}
    </div>
  );
};

export default Board;
