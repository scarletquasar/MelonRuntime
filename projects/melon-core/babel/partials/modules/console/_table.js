"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._table = _table;

var _console2 = require("./_console");

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _table(data, columns) {
  if (data.constructor === Object) {
    if (!columns) {
      columns = [];

      for (var prop in data[0]) {
        if (columns.indexOf(prop) === -1) {
          columns.push(prop);
        }
      }

      var header = '(index)';

      for (var p in columns) {
        header += ' | ';
        header += columns[p];
      }

      _console2._console.log(header);
    } else if (_typeof(columns) !== 'object') {
      var _columns = [];

      for (var index in data) {
        for (var _prop in data[index]) {
          if (_columns.indexOf(_prop) === -1) {
            _columns.push(_prop);
          }
        }
      }
    } else {
      var _header = '(index)';

      for (var _p in columns) {
        _header += ' | ';
        _header += columns[_p];
      }

      _console2._console.log(_header);
    }

    for (var obj in data) {
      var entry = data[obj];
      var entryStr = obj + '';

      for (var j = 0; j < columns.length; j++) {
        entryStr += ' | ';
        entryStr += entry[columns[j]];
      }

      _console2._console.log(entryStr);
    }
  } else if (data.constructor === Array) {
    if (!columns) {
      var _columns2 = [];

      for (var _prop2 in data[0]) {
        if (_columns2.indexOf(_prop2) === -1) {
          _columns2.push(_prop2);
        }
      }

      var _header2 = '(index)';

      for (var _p2 in _columns2) {
        _header2 += ' | ';
        _header2 += _columns2[_p2];
      }

      _console2._console.log(_header2);
    } else if (_typeof(columns) !== 'object') {
      var _columns3 = [];

      for (var _index in data) {
        for (var _prop3 in data[_index]) {
          if (_columns3.indexOf(_prop3) === -1) {
            _columns3.push(_prop3);
          }
        }
      }
    } else {
      var _header3 = '(index)';

      for (var _p3 in columns) {
        _header3 += ' | ';
        _header3 += columns[_p3];
      }

      _console2._console.log(_header3);
    }

    for (var i = 0; i < data.length; i++) {
      var _entry = data[i];

      var _entryStr = i + '';

      for (var _j = 0; _j < columns.length; _j++) {
        _entryStr += ' | ';
        _entryStr += _entry[columns[_j]];
      }

      _console2._console.log(_entryStr);
    }
  }
}