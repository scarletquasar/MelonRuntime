"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._PgClient = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

var _options = /*#__PURE__*/new WeakMap();

var _PgClient = /*#__PURE__*/function () {
  function _PgClient(options) {
    _classCallCheck(this, _PgClient);

    _classPrivateFieldInitSpec(this, _options, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldSet(this, _options, options);
  }

  _createClass(_PgClient, [{
    key: "executeNonQuery",
    value: function executeNonQuery(sql) {
      var sendNonQueryCommand = _$internalBinding["PostgreSQLBindingNonQuery"];
      return sendNonQueryCommand(sql, _classPrivateFieldGet(this, _options));
    }
  }, {
    key: "executeQuery",
    value: function executeQuery(sql) {
      var sendQueryCommand = _$internalBinding["PostgreSQLBindingQuery"];
      var result = sendQueryCommand(sql, _classPrivateFieldGet(this, _options));
      return JSON.parse(result);
    }
  }]);

  return _PgClient;
}();

exports._PgClient = _PgClient;