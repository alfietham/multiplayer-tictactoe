"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleGameAction = exports.boardState = void 0;

var _gameUtils = require("./gameUtils");

var boardState = {
  currentGameBoard: [null, null, null, null, null, null, null, null, null],
  nextTurn: 'X',
  winner: null,
  isBoardFull: false
};
exports.boardState = boardState;

var updateBoard = function updateBoard(_ref) {
  var move = _ref.move,
      player = _ref.player;
  boardState.currentGameBoard[move] = player;
  return boardState.currentGameBoard;
};

var handleGameAction = function handleGameAction(_ref2) {
  var move = _ref2.move,
      player = _ref2.player;
  var currentBoard = boardState.currentGameBoard;
  var winnerIs = (0, _gameUtils.computeWinner)(currentBoard);
  return new Promise(function (resolve) {
    // No change if box has been selected, or winner is found
    if (currentBoard[move] || winnerIs) {
      resolve({
        currentGameBoard: currentBoard,
        winner: winnerIs,
        nextTurn: player === 'X' ? 'O' : 'X',
        isBoardFull: (0, _gameUtils.isBoardFull)(currentBoard)
      });
    } // Otherwise, next turn


    resolve({
      currentGameBoard: updateBoard({
        move: move,
        player: player
      }),
      winner: winnerIs,
      nextTurn: player === 'X' ? 'O' : 'X',
      isBoardFull: (0, _gameUtils.isBoardFull)(currentBoard)
    });
  });
};

exports.handleGameAction = handleGameAction;