"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._dotnetConsole = void 0;

var _dotnet2 = require("../dotnet/_dotnet");

var _dotnetConsole = function _dotnetConsole(method) {
  return _dotnet2._dotnet.getStaticMethod("System:Console:".concat(method));
};

exports._dotnetConsole = _dotnetConsole;