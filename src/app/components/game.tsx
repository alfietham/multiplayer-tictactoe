import * as React from 'react';

import Board from './board';
import { GameBoxContent, HandleClick, GameState } from '../../../types/index';
import { makeMoveSocket, getInitialStateSocket } from '../common/socketutils';

let initialBoardState: GameState;

class Game extends React.Component<any, GameState> {
  constructor(props: any) {
    super(props);
    
    getInitialStateSocket().then(initialState => {
      initialBoardState = initialState;
      this.state = initialState;
    });
  }

  handleClick: HandleClick = value => {
    // Process click if it is the current player's turn
    if (this.state.nextTurn === this.props.playerSide) {
      // Send value to server
      makeMoveSocket({ move: value, player: this.props.playerSide })
        // handle game board and turn
        .then(
          ({ currentGameBoard, winner, nextTurn, isBoardFull }: GameState) => {
            this.setState({
              currentGameBoard: currentGameBoard,
              nextTurn: nextTurn,
              winner: winner,
              isBoardFull: isBoardFull,
            });
          }
        );
    }
  };

  resetBoard: () => void = () => this.setState(initialBoardState);

  render() {
    const currentBoard = this.state.currentGameBoard;
    const winner: GameBoxContent = this.state.winner;

    let status: string;
    if (winner) {
      status = 'Winner: ' + winner;
    } else if (this.state.isBoardFull) {
      status = 'Draw.';
    } else {
      status = 'Next player: ' + this.state.nextTurn;
    }

    return (
      <div className="game">
        <div className="game-status">{status}</div>
        <Board
          handleClick={(value: number) => this.handleClick(value)}
          currentGameBoard={currentBoard}
        />
        {(!!winner || this.state.isBoardFull) && (
          <div className="rematch-button" onClick={() => this.resetBoard()}>
            REMATCH
          </div>
        )}
      </div>
    );
  }
}

export default Game;
