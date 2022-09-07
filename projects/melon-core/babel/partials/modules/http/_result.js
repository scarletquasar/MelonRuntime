"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._result = _result;

var _std2 = require("../std/_std");

function _result(statusCode) {
  var response = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return {
    type: "application/json",
    status: statusCode,
    response: _std2._std.json.tryStringify(response)
  };
}