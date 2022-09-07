"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._tryStringify = _tryStringify;

function _tryStringify(target) {
  try {
    return JSON.stringify(target);
  } catch (_unused) {
    return "";
  }
}