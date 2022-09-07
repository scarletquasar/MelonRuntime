"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._getEnvironmentVariables = _getEnvironmentVariables;

var _dotnet2 = require("../../dotnet/_dotnet");

function _getEnvironmentVariables() {
  var localEnv = _$internalBinding["LocalEnvironmentVariables"];

  var processEnv = _dotnet2._dotnet.getStaticMethod("System:Environment:GetEnvironmentVariables")();

  return Object.assign(localEnv, processEnv);
}