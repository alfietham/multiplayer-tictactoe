import * as React from 'react';

import Square from './square';
import { HandleClick, GameState } from '../common/types';

const Board: (
  {
    handleClick,
    currentGameBoard,
  }: {
    handleClick: HandleClick;
    currentGameBoard: GameState['currentGameBoard'];
  }
) => JSX.Element = ({ handleClick, currentGameBoard }) => {
  let boardIndices = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <div className="board">
      {boardIndices.map(index => (
        <Square
          key={index}
          content={currentGameBoard[index]}
          handleClick={() => handleClick(index)}
        />
      ))}
    </div>
  );
};

export default Board;
