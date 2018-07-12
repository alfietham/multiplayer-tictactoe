import * as React from 'react';
import { JoinGame } from '../../../types/index';
import Loader from './loader';

const Lobby: (
  {
    joinGame,
    waitingToJoinGame,
  }: {
    joinGame: JoinGame;
    waitingToJoinGame: boolean;
  }
) => JSX.Element = ({ joinGame, waitingToJoinGame }) => {
  return (
    <div className="lobby">
      {waitingToJoinGame ? (
        <div>
          <div className="lobby-text">Waiting to join game...</div>
          <Loader />
        </div>
      ) : (
        <div className="join-game-button" onClick={() => joinGame()}>
          JOIN GAME
        </div>
      )}
    </div>
  );
};

export default Lobby;
