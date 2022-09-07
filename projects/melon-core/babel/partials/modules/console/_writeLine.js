"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._writeLine = _writeLine;

var _std2 = require("../std/_std");

var _dotnetCLNConsole2 = require("./_dotnetCLNConsole");

function _writeLine(target) {
  var color = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "White";

  var result = _std2._std.json.tryStringify(target);

  (0, _dotnetCLNConsole2._dotnetCLNConsole)("WriteLine")(result, color);
}