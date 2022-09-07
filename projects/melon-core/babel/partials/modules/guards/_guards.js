"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._guards = void 0;
var _guards = {
  number: {
    isEven: function isEven(number) {
      return number % 2 == 0;
    },
    isOdd: function isOdd(number) {
      return !_guards.number.isEven(number);
    },
    isInteger: function isInteger(number) {
      return Number.isInteger(number);
    },
    isFloat: function isFloat(number) {
      return !(number % 1 === 0);
    }
  },
  iterable: {
    isEmptyArray: function isEmptyArray(array) {
      return array.length === 0;
    },
    isEmptyObject: function isEmptyObject(object) {
      return _guards.iterable.isEmptyArray(Object.keys(object));
    }
  },
  string: {
    isNullOrEmpty: function isNullOrEmpty(string) {
      return string === null || string.length === 0;
    },
    isNullOrWhiteSpace: function isNullOrWhiteSpace(string) {
      return string === null || string.trim().length === 0;
    }
  }
};
exports._guards = _guards;