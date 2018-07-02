import * as React from 'react';

import Game from './components/game';
import {
  connectSocket,
  disconnectSocket,
  joiningGameSocket,
} from './common/socketutils';
import { AppState } from './common/types';
import Lobby from './components/lobby';

const initialAppState = {
  waitingToJoinGame: false,
  joinedGame: false,
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

      joiningGameSocket().then(msg => {
        console.log('joiningGameSocket msg:', msg);
        this.setState(
          Object.assign(this.state, {
            waitingToJoinGame: false,
            joinedGame: true,
          })
        );
      });
    };

    return (
      <div className="app">
        <div className="app-title">React Typescript Tic-tac-toe!</div>
        {this.state.joinedGame ? (
          <Game />
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
