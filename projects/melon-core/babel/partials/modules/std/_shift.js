"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._shift = _shift;

var _std2 = require("./_std");

function _shift() {
  return {
    option: function option(condition, callback) {
      condition ? callback() : {};
      return _std2._std.shift();
    }
  };
}