"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._setTimeout = _setTimeout;

var _std2 = require("../_std");

function _setTimeout(callback, delay) {
  var identifier = function identifier() {
    return _std2._std.time._timers.push({
      callback: callback
    }) - 1;
  };

  _$internalBinding["SetTimeout"](identifier(), delay);
}