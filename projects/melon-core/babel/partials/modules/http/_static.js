"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._static = _static;

function _static(response, type) {
  return {
    type: type,
    status: 200,
    response: response
  };
}