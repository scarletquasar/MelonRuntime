"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._types = void 0;

var _internalConsts2 = require("../internalConsts/_internalConsts");

var _types = {
  sbyte: function sbyte(number) {
    if (number > 127 || number < -128) {
      throw new RangeError(_internalConsts2._internalConsts.INVALID_NUMBER_CAPACITY);
    }

    var value = Math.floor(number);
    return {
      type: "sbyte",
      value: value
    };
  },
  "byte": function byte(number) {
    if (number > 255 || number < 0) {
      throw new RangeError(_internalConsts2._internalConsts.INVALID_NUMBER_CAPACITY);
    }

    var value = Math.floor(number);
    return {
      type: "byte",
      value: value
    };
  },
  "short": function short(number) {
    if (number > 32767 || number < -32768) {
      throw new RangeError(_internalConsts2._internalConsts.INVALID_NUMBER_CAPACITY);
    }

    var value = Math.floor(number);
    return {
      type: "short",
      value: value
    };
  },
  ushort: function ushort(number) {
    if (number > 65535 || number < 0) {
      throw new RangeError(_internalConsts2._internalConsts.INVALID_NUMBER_CAPACITY);
    }

    var value = Math.floor(number);
    return {
      type: "ushort",
      value: value
    };
  },
  "int": function int(number) {
    if (number > 2147483647 || number < -2147483648) {
      throw new RangeError(_internalConsts2._internalConsts.INVALID_NUMBER_CAPACITY);
    }

    var value = Math.floor(number);
    return {
      type: "int",
      value: value
    };
  },
  uint: function uint(number) {
    if (number > 4294967295 || number < 0) {
      throw new RangeError(_internalConsts2._internalConsts.INVALID_NUMBER_CAPACITY);
    }

    var value = Math.floor(number);
    return {
      type: "uint",
      value: value
    };
  },
  "long": function long(number) {
    if (number > 9223372036854775807 || number < -9223372036854775808) {
      throw new RangeError(_internalConsts2._internalConsts.INVALID_NUMBER_CAPACITY);
    }

    var value = Math.floor(number);
    return {
      type: "long",
      value: value
    };
  },
  ulong: function ulong(number) {
    if (number > 18446744073709551615 || number < 0) {
      throw new RangeError(_internalConsts2._internalConsts.INVALID_NUMBER_CAPACITY);
    }

    var value = Math.floor(number);
    return {
      type: "ulong",
      value: value
    };
  },
  "float": function float(number) {
    return {
      type: "float",
      number: number
    };
  },
  "double": function double(number) {
    return {
      type: "double",
      number: number
    };
  },
  decimal: function decimal(number) {
    return {
      type: "decimal",
      number: number
    };
  }
};
exports._types = _types;