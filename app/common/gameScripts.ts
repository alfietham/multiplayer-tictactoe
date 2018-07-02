import { GameBoxContent } from "./types";

export const computeWinner: (current: GameBoxContent[]) => GameBoxContent = (current) => {
  const lines: number[][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [0, 4, 8],
  ];

  return lines.map((line) => {
    const [a, b, c] = line;
    if (current[a] && current[a] === current[b] && current[a] === current[c]) {
      return current[a];
    } else {
      return null;
    }
  })
  // Reduce to return any non-null value, otherwise return null
  .reduce((acc, curr) => curr || acc);
};

export const isBoardFull: (current: GameBoxContent[]) => boolean = (current) => (
  // Board is full if there are no more null elements
  current.filter(el => el === null).length === 0
);
