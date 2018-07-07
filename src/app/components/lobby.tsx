import * as React from 'react';
import { JoinGame } from '../../../types/index';

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
        <div>WAITING TO JOIN GAME</div>
      ) : (
        <div className="join-game-button" onClick={() => joinGame()}>
          JOIN GAME
        </div>
      )}
    </div>
  );
};

export default Lobby;
