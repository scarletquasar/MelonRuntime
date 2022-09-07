"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._compare = _compare;

var _internalConsts2 = require("../internalConsts/_internalConsts");

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _compare(target, value) {
  var expression = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function (a, b) {
    return a === b;
  };
  var customModifier = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var result = {
    comment: "",
    equals: false
  };

  var compareUniques = function compareUniques(target, value) {
    return expression(target, value);
  };

  var compareArrays = function compareArrays(target, value) {
    var equalityArray = [];
    target.forEach(function (item, index) {
      var value1 = item;
      var value2 = value[index];

      var _compare2 = _compare(value1, value2, expression, customModifier),
          equals = _compare2.equals;

      equalityArray.push(equals);
    });
    return equalityArray.every(function (item) {
      return item === true;
    });
  };

  var compareObjects = function compareObjects(target, value) {
    return compareArrays(Object.entries(target), Object.entries(value));
  };

  var compareMaps = function compareMaps(target, value) {
    return compareArrays(Array.from(target.entries()), Array.from(value.entries()));
  };

  var compareSets = function compareSets(target, value) {
    return compareArrays(Array.from(target), Array.from(value));
  };

  switch (_typeof(target)) {
    case "string":
    case "number":
    case "boolean":
      var targetLength = target.toString().length;
      var valueLength = value.toString().length;

      if (targetLength != valueLength) {
        result.comment = _internalConsts2._internalConsts.COMPARATION_LENGTH_IS_DIFFERENT;
        return result;
      }

      if (!compareUniques(target, value)) {
        result.comment = _internalConsts2._internalConsts.COMPARATION_BASE_IS_DIFFERENT;
        return result;
      }

      result.equals = true;
      return result;

    case "object":
      if (Array.isArray(target)) {
        if (target.length != value.length) {
          result.comment = _internalConsts2._internalConsts.COMPARATION_LENGTH_IS_DIFFERENT;
          return result;
        }

        result.equals = compareArrays(target, value);
        return result;
      }

      if (target.constructor === Set) {
        if (target.size != value.size) {
          result.comment = _internalConsts2._internalConsts.COMPARATION_LENGTH_IS_DIFFERENT;
          return result;
        }

        result.equals = compareSets(target, value);
        return result;
      }

      if (target.constructor === Map) {
        if (target.size != value.size) {
          result.comment = _internalConsts2._internalConsts.COMPARATION_LENGTH_IS_DIFFERENT;
          return result;
        }

        result.equals = compareMaps(target, value);
        return result;
      }

      if (target.constructor === Object) {
        if (Object.keys(target).length != Object.keys(value).length) {
          result.comment = _internalConsts2._internalConsts.COMPARATION_LENGTH_IS_DIFFERENT;
          return result;
        }

        result.equals = compareObjects(target, value);
        return result;
      }

  }

  if (customModifier) {
    var modified = customModifier(target, value);
    return _compare(modified[0], modified[1]);
  }

  throw new TypeError(_internalConsts2._internalConsts.NO_SUPPORT_FOR_THE_OBJECT);
}