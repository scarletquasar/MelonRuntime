"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._checkAll = _checkAll;

function _checkAll(method, values) {
  var results = [];
  values.forEach(function (value) {
    return results.push(method(value));
  });
  return results.every(function (result) {
    return result === true;
  });
}