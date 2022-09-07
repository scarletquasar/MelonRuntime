"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._dotnetCLNConsole = void 0;

var _dotnet2 = require("../dotnet/_dotnet");

var _dotnetCLNConsole = function _dotnetCLNConsole(method) {
  return _dotnet2._dotnet.getStaticMethod("Cli.NET.Tools:CLNConsole:".concat(method));
};

exports._dotnetCLNConsole = _dotnetCLNConsole;