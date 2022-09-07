"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._HttpApplication = void 0;

var _HttpEndpoint2 = require("./_HttpEndpoint");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

var _endpoints = /*#__PURE__*/new WeakMap();

var _echoes = /*#__PURE__*/new WeakMap();

var _HttpApplication = /*#__PURE__*/function () {
  function _HttpApplication(name, host, port) {
    var enableHttps = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

    _classCallCheck(this, _HttpApplication);

    _defineProperty(this, "name", void 0);

    _defineProperty(this, "host", void 0);

    _defineProperty(this, "port", void 0);

    _defineProperty(this, "enableHttps", void 0);

    _classPrivateFieldInitSpec(this, _endpoints, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _echoes, {
      writable: true,
      value: void 0
    });

    this.name = name;
    this.host = host;
    this.port = port;
    this.enableHttps = enableHttps;

    _classPrivateFieldSet(this, _echoes, []);

    _classPrivateFieldSet(this, _endpoints, []);
  }

  _createClass(_HttpApplication, [{
    key: "get",
    value: function get(route, callback) {
      var httpRoute = new _HttpEndpoint2._HttpEndpoint(route, "GET", callback);

      _classPrivateFieldGet(this, _endpoints).push(httpRoute);
    }
  }, {
    key: "post",
    value: function post(route, callback) {
      var httpRoute = new _HttpEndpoint2._HttpEndpoint(route, "POST", callback);

      _classPrivateFieldGet(this, _endpoints).push(httpRoute);
    }
  }, {
    key: "delete",
    value: function _delete(route, callback) {
      var httpRoute = new _HttpEndpoint2._HttpEndpoint(route, "DELETE", callback);

      _classPrivateFieldGet(this, _endpoints).push(httpRoute);
    }
  }, {
    key: "listen",
    value: function listen(port) {
      var host = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.host;

      _classPrivateFieldGet(this, _echoes).push({
        host: host,
        port: port
      });
    }
  }, {
    key: "run",
    value: function run() {
      var parameters = JSON.stringify({
        Name: this.name,
        Host: this.host,
        Port: this.port,
        Routes: JSON.stringify(_classPrivateFieldGet(this, _endpoints)),
        Echoes: JSON.stringify(_classPrivateFieldGet(this, _echoes)),
        EnableHttps: this.enableHttps
      });

      _$internalBinding["SetupWebApplication"](parameters);
    }
  }]);

  return _HttpApplication;
}();

exports._HttpApplication = _HttpApplication;