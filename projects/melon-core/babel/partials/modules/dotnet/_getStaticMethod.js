"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._getStaticMethod = _getStaticMethod;

function _getStaticMethod(expression) {
  var parts = expression.split(":");
  var namespace = parts[0];
  var type = parts[1];
  var method = parts[2];

  var finalMethod = function finalMethod() {
    var callStaticMethodBinding = _$internalBinding["CallStaticMethod"];

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return callStaticMethodBinding(namespace, type, method, [].concat(args));
  };

  return finalMethod;
}