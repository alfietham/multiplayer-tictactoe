export type HandleClick = (value: number) => void;

export type GameBoxContent = null | 'X' | 'O';

export interface GameState {
  currentGameBoard: GameBoxContent[];
  currentTurnIsX: boolean;
}

export interface AppState {
  waitingToJoinGame: boolean,
  joinedGame: boolean
}

export type JoinGame = () => void;
