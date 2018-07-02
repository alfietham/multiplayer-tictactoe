import * as React from 'react';

import Board from './board';
import { computeWinner, isBoardFull } from '../common/gameScripts';
import { GameBoxContent, HandleClick, GameState } from '../common/types';

const initialBoardState = {
  currentGameBoard: [null, null, null, null, null, null, null, null, null],
  currentTurnIsX: true,
};

class Game extends React.Component<any, GameState> {
  constructor(props: any) {
    super(props);
    this.state = initialBoardState;
  }

  handleClick: HandleClick = value => {
    const currentBoard = this.state.currentGameBoard.slice();
    // No change if box has been selected, or winner is found
    if (currentBoard[value] || computeWinner(currentBoard)) {
      return;
    }
    currentBoard[value] = this.state.currentTurnIsX ? 'X' : 'O';
    this.setState({
      currentGameBoard: currentBoard,
      currentTurnIsX: !this.state.currentTurnIsX,
    });
  };

  resetBoard: () => void = () => this.setState(initialBoardState);

  render() {
    const currentBoard = this.state.currentGameBoard;
    const winner: GameBoxContent = computeWinner(currentBoard);

    let status: string;
    if (winner) {
      status = 'Winner: ' + winner;
    } else if (isBoardFull(currentBoard)) {
      status = 'Draw.';
    } else {
      status = 'Next player: ' + (this.state.currentTurnIsX ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-status">{status}</div>
        <Board
          handleClick={(value: number) => this.handleClick(value)}
          currentGameBoard={currentBoard}
        />
        {(!!winner || isBoardFull(currentBoard)) && (
          <div className="rematch-button" onClick={() => this.resetBoard()}>
            REMATCH
          </div>
        )}
      </div>
    );
  }
}

export default Game;
