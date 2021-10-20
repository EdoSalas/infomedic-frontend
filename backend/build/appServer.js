"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _http = _interopRequireDefault(require("http"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const server = _http.default.createServer((req, res) => {
  res.end('Trabajando con NodeJS + Babel + React');
}).listen(4001);

console.log('Estamos en el tutorial de Node+Babel+React :)');
var _default = server;
exports.default = _default;