import * as React from 'react';

import Board from './board';
import {
  GameBoxContent,
  HandleClick,
  GameState,
  players,
} from '../../types';
import {
  makeMoveSocket,
  listenForChanges,
  handleRematchSocket,
} from '../utils/socketUtils';

let initialBoardState: GameState = {
  gameBoard: [null, null, null, null, null, null, null, null, null],
  nextTurn: 'X',
  winner: null,
  isBoardFull: false,
};

class Game extends React.Component<{ playerSide: players }, GameState> {
  constructor(props: any) {
    super(props);

    this.state = initialBoardState;
  }

  handleClick: HandleClick = value => {
    // Process click if it is the current player's turn,
    // And if the game has not ended, and board is not full
    if (
      this.state.nextTurn === this.props.playerSide &&
      this.state.winner === null &&
      !this.state.isBoardFull
    ) {
      // Send value to server
      makeMoveSocket({ move: value, player: this.props.playerSide });
    }
  };

  initiateRematch: () => void = () => handleRematchSocket();

  render() {
    listenForChanges().then(
      ({ gameBoard, winner, nextTurn, isBoardFull }: GameState) => {
        this.setState({
          gameBoard: gameBoard,
          nextTurn: nextTurn,
          winner: winner,
          isBoardFull: isBoardFull,
        });
      }
    );

    const currentBoard = this.state.gameBoard;
    const winner: GameBoxContent = this.state.winner;

    let status: string;
    if (winner) {
      status = 'Winner: ' + winner;
    } else if (this.state.isBoardFull) {
      status = 'Draw.';
    } else if (this.state.nextTurn === this.props.playerSide) {
      status = 'Your turn';
    } else {
      status = `${this.state.nextTurn}'s turn`;
    }

    return (
      <div className="game">
        <div className="game-status">{status}</div>
        <Board
          handleClick={(value: number) => this.handleClick(value)}
          gameBoard={currentBoard}
        />
        {(!!winner || this.state.isBoardFull) && (
          <div
            className="rematch-button"
            onClick={() => this.initiateRematch()}
          >
            REMATCH
          </div>
        )}
      </div>
    );
  }
}

export default Game;
