"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._tryParse = _tryParse;

function _tryParse(json) {
  try {
    return JSON.parse(json);
  } catch (_unused) {
    return {};
  }
}