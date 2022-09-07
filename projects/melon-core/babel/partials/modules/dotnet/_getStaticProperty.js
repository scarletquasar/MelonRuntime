"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._getStaticProperty = _getStaticProperty;

function _getStaticProperty(expression) {
  var parts = expression.split(":");
  var namespace = parts[0];
  var type = parts[1];
  var property = parts[2];
  var callStaticPropertyBinding = _$internalBinding["GetStaticProperty"];
  var internalStaticProperty = callStaticPropertyBinding(namespace, type, property);
  return internalStaticProperty;
}