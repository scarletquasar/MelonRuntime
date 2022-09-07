"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._checkOne = _checkOne;

function _checkOne(method, values) {
  var results = [];
  values.forEach(function (value) {
    return results.push(method(value));
  });
  return results.find(function (result) {
    return result === true;
  }) !== null;
}