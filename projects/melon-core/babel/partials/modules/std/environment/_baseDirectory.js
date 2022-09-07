"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._baseDirectory = void 0;

var _dotnet2 = require("../../dotnet/_dotnet");

var _baseDirectory = _dotnet2._dotnet.getStaticProperty("System:Environment:CurrentDirectory");

exports._baseDirectory = _baseDirectory;