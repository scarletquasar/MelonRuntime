"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._std = void 0;

var _Version2 = require("../../constructors/_Version");

var _checkAll2 = require("./boolean/_checkAll");

var _checkOne2 = require("./boolean/_checkOne");

var _baseDirectory2 = require("./environment/_baseDirectory");

var _clearLocalEnvironmentVariables2 = require("./environment/_clearLocalEnvironmentVariables");

var _getEnvironmentVariables2 = require("./environment/_getEnvironmentVariables");

var _setEnvironmentVariable2 = require("./environment/_setEnvironmentVariable");

var _tryParse2 = require("./json/_tryParse");

var _tryStringify2 = require("./json/_tryStringify");

var _argv2 = require("./process/_argv");

var _env2 = require("./process/_env");

var _exit2 = require("./process/_exit");

var _osInformation2 = require("./system/_osInformation");

var _setInterval2 = require("./time/_setInterval");

var _setTimeout2 = require("./time/_setTimeout");

var _shift2 = require("./_shift");

var _std = {
  shift: _shift2._shift,
  melon: {
    currentVersion: new _Version2._Version(),
    loadedModules: new Array()
  },
  "boolean": {
    checkAll: _checkAll2._checkAll,
    checkOne: _checkOne2._checkOne
  },
  json: {
    tryParse: _tryParse2._tryParse,
    tryStringify: _tryStringify2._tryStringify
  },
  time: {
    _timers: [],
    setInterval: _setInterval2._setInterval,
    setTimeout: _setTimeout2._setTimeout
  },
  system: {
    osInformation: _osInformation2._osInformation
  },
  environment: {
    baseDirectory: _baseDirectory2._baseDirectory,
    getEnvironmentVariables: _getEnvironmentVariables2._getEnvironmentVariables,
    setEnvironmentVariable: _setEnvironmentVariable2._setEnvironmentVariable,
    clearLocalEnvironmentVariables: _clearLocalEnvironmentVariables2._clearLocalEnvironmentVariables
  },
  process: {
    argv: _argv2._argv,
    env: _env2._env,
    exit: _exit2._exit
  }
};
exports._std = _std;