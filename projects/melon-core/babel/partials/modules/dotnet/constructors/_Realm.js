"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._Realm = void 0;

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _Realm = /*#__PURE__*/_createClass(function _Realm(name) {
  var _this = this;

  _classCallCheck(this, _Realm);

  _defineProperty(this, "name", void 0);

  _defineProperty(this, "setValue", void 0);

  _defineProperty(this, "setInstance", void 0);

  _defineProperty(this, "get", void 0);

  _$internalBinding["CreateRealm"](name);

  this.name = name;

  this.setValue = function (name, value) {
    return _$internalBinding["SetRealmScriptProperty"](_this.name, name, value);
  };

  this.setInstance = function (name, expression) {
    var parts = expression.split(":");
    var namespace = parts[0];
    var type = parts[1];

    for (var _len = arguments.length, parameters = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      parameters[_key - 2] = arguments[_key];
    }

    _$internalBinding["SetRealmInstanceProperty"](_this.name, name, namespace, type, Array.from(parameters));
  };

  this.get = function (name) {
    return _$internalBinding["GetRealmProperty"](_this.name, name);
  };
});

exports._Realm = _Realm;