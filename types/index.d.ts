export type HandleClick = (value: number) => void;

export type GameBoxContent = null | 'X' | 'O';

type players = 'X' | 'O';

export interface GameState {
  gameBoard: GameBoxContent[];
  winner: GameBoxContent;
  nextTurn: players;
  isBoardFull: boolean
}

export interface AppState {
  waitingToJoinGame: boolean;
  joinedGame: boolean;
  playerSide: players;
  errorMessage: string;
}

export type JoinGame = () => void;

export interface MovePayload {
  move: number;
  player: players;
}

interface GameInGamesList {
  roomName: string;
  currentBoardState: GameBoxContent[];
}
