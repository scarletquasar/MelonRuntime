"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._clearLocalEnvironmentVariables = _clearLocalEnvironmentVariables;

var _std2 = require("../_std");

function _clearLocalEnvironmentVariables() {
  _$internalBinding["LocalEnvironmentVariables"].Clear();

  _std2._std.process.env = _$internalBinding["ProcessEnvironmentVariables"];
}