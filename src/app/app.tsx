import * as React from 'react';

import Game from './components/game';
import {
  connectSocket,
  disconnectSocket,
  joiningGameSocket,
  handleOtherPlayerDisconnectSocket,
} from './utils/socketUtils';
import { AppState, players } from '../types';
import Lobby from './components/lobby';

const initialAppState: AppState = {
  waitingToJoinGame: false,
  joinedGame: false,
  playerSide: 'X',
  errorMessage: undefined,
};

export class App extends React.Component<any, AppState> {
  constructor(props: any) {
    super(props);
    this.state = initialAppState;

    connectSocket();

    handleOtherPlayerDisconnectSocket().then(() => {
      this.setState({
        ...initialAppState,
        errorMessage: 'Oops. The other player has left...',
      });
    });
  }

  componentWillUnmount() {
    disconnectSocket();
  }

  render() {
    const joinGame = () => {
      this.setState({
        waitingToJoinGame: true,
        errorMessage: undefined,
      });

      joiningGameSocket().then((player: players) => {
        console.log('joiningGameSocket player:', player);
        this.setState({
          waitingToJoinGame: false,
          joinedGame: true,
          playerSide: player,
        });
      });
    };

    return (
      <div className="app">
        <div className="app-title">Multiplayer Tic-tac-toe!</div>
        {this.state.joinedGame ? (
          <Game playerSide={this.state.playerSide} />
        ) : (
          <Lobby
            joinGame={() => joinGame()}
            waitingToJoinGame={this.state.waitingToJoinGame}
          />
        )}
        {this.state.errorMessage !== undefined && (
          <div className="app-error-text">{this.state.errorMessage}</div>
        )}
      </div>
    );
  }
}
