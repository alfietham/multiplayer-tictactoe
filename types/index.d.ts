export type HandleClick = (value: number) => void;

export type GameBoxContent = null | 'X' | 'O';

export interface GameState {
  currentGameBoard: GameBoxContent[];
  winner: GameBoxContent;
  nextTurn: GameBoxContent;
  isBoardFull: boolean
}

export interface AppState {
  waitingToJoinGame: boolean;
  joinedGame: boolean;
  playerSide: GameBoxContent;
}

export type JoinGame = () => void;

export interface MovePayload {
  move: number;
  player: GameBoxContent;
}
