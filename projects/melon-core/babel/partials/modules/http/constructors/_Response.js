"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._Response = void 0;

var _std2 = require("../../std/_std");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _Response = /*#__PURE__*/function () {
  function _Response(body, headers, latency, statusCode, ok) {
    _classCallCheck(this, _Response);

    _defineProperty(this, "body", void 0);

    _defineProperty(this, "headers", void 0);

    _defineProperty(this, "latency", void 0);

    _defineProperty(this, "statusCode", void 0);

    _defineProperty(this, "ok", void 0);

    this.body = body;
    this.headers = headers;
    this.latency = latency;
    this.statusCode = statusCode;
    this.ok = ok;
  }

  _createClass(_Response, [{
    key: "json",
    value: function json() {
      return _std2._std.json.tryParse(this.body);
    }
  }, {
    key: "text",
    value: function text() {
      return this.body;
    }
  }]);

  return _Response;
}();

exports._Response = _Response;