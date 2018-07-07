import * as React from 'react';

import Game from './components/game';
import {
  connectSocket,
  disconnectSocket,
  joiningGameSocket,
} from './common/socketutils';
import { AppState } from '../../types/index';
import Lobby from './components/lobby';

const initialAppState = {
  waitingToJoinGame: false,
  joinedGame: false,
  playerSide: null
};

export class App extends React.Component<any, AppState> {
  constructor(props: any) {
    super(props);
    this.state = initialAppState;

    connectSocket();
  }

  componentWillUnmount() {
    disconnectSocket();
  }

  render() {
    const joinGame = () => {
      this.setState(
        Object.assign(this.state, {
          waitingToJoinGame: true,
        })
      );

      joiningGameSocket().then(player => {
        console.log('joiningGameSocket player:', player);
        this.setState(
          Object.assign(this.state, {
            waitingToJoinGame: false,
            joinedGame: true,
            playerSide: player
          })
        );
      });
    };

    return (
      <div className="app">
        <div className="app-title">React Typescript Tic-tac-toe!</div>
        {this.state.joinedGame ? (
          <Game playerSide={this.state.playerSide}/>
        ) : (
          <Lobby
            joinGame={() => joinGame()}
            waitingToJoinGame={this.state.waitingToJoinGame}
          />
        )}
      </div>
    );
  }
}
