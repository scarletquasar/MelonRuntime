"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._fs = void 0;

var _readBytes2 = require("./_readBytes");

var _readText2 = require("./_readText");

var _writeBytes2 = require("./_writeBytes");

var _writeText2 = require("./_writeText");

var _fs = {
  readText: _readText2._readText,
  writeText: _writeText2._writeText,
  readBytes: _readBytes2._readBytes,
  writeBytes: _writeBytes2._writeBytes
};
exports._fs = _fs;