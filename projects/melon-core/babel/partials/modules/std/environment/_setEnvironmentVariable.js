"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._setEnvironmentVariable = _setEnvironmentVariable;

var _std2 = require("../_std");

function _setEnvironmentVariable(key, value) {
  _$internalBinding["LocalEnvironmentVariables"][key] = value;
  _std2._std.process.env[key] = value;
}