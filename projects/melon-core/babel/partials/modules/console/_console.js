"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._console = void 0;

var _clear2 = require("./_clear");

var _error2 = require("./_error");

var _log2 = require("./_log");

var _table2 = require("./_table");

var _warn2 = require("./_warn");

var _write2 = require("./_write");

var _writeLine2 = require("./_writeLine");

var _console = {
  log: _log2._log,
  write: _write2._write,
  writeLine: _writeLine2._writeLine,
  error: _error2._error,
  warn: _warn2._warn,
  clear: _clear2._clear,
  table: _table2._table
};
exports._console = _console;