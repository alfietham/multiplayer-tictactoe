"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isBoardFull = exports.computeWinner = void 0;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var computeWinner = function computeWinner(current) {
  var lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [2, 4, 6], [0, 4, 8]];
  return lines.map(function (line) {
    var _line = _slicedToArray(line, 3),
        a = _line[0],
        b = _line[1],
        c = _line[2];

    if (current[a] && current[a] === current[b] && current[a] === current[c]) {
      return current[a];
    } else {
      return null;
    }
  }) // Reduce to return any non-null value, otherwise return null
  .reduce(function (acc, curr) {
    return curr || acc;
  });
};

exports.computeWinner = computeWinner;

var isBoardFull = function isBoardFull(current) {
  return (// Board is full if there are no more null elements
    current.filter(function (el) {
      return el === null;
    }).length === 0
  );
};

exports.isBoardFull = isBoardFull;