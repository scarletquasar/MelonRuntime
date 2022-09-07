"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._log = _log;

var _std2 = require("../std/_std");

var _dotnetCLNConsole2 = require("./_dotnetCLNConsole");

function _log() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  Array.from(args).forEach(function (object) {
    var result = _std2._std.json.tryStringify(object);

    (0, _dotnetCLNConsole2._dotnetCLNConsole)("WriteLine")(result, "White");
  });
}

;