"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._argv = void 0;

var _dotnet2 = require("../../dotnet/_dotnet");

var _argv = _dotnet2._dotnet.getStaticMethod("System:Environment:GetCommandLineArgs")();

exports._argv = _argv;