"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._HttpEndpoint = void 0;

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _HttpEndpoint = /*#__PURE__*/_createClass(function _HttpEndpoint(route, method, callback) {
  _classCallCheck(this, _HttpEndpoint);

  _defineProperty(this, "route", void 0);

  _defineProperty(this, "method", void 0);

  _defineProperty(this, "callback", void 0);

  this.route = route;
  this.method = method;
  this.callback = callback;
});

exports._HttpEndpoint = _HttpEndpoint;