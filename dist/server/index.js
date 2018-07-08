"use strict";

var _express = _interopRequireDefault(require("express"));

var _http = _interopRequireDefault(require("http"));

var _socket = _interopRequireDefault(require("socket.io"));

var _path = _interopRequireDefault(require("path"));

var _socketsHandler = _interopRequireDefault(require("./socketsHandler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express.default)();

var server = _http.default.createServer(app);

var io = (0, _socket.default)(server);
app.get('/ping', function (_, res) {
  res.json({
    hello: 'world'
  });
});
app.get('/', function (_, res) {
  res.sendFile(_path.default.resolve(__dirname, '../app/index.html'));
});
var PORT = 3000;
server.listen(PORT);
console.info('Server started at port: ', PORT);
(0, _socketsHandler.default)(io);