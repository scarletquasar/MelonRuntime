"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._app = _app;

var _HttpApplication2 = require("./constructors/_HttpApplication");

var _http2 = require("./_http");

function _app() {
  var _options$enableHttps;

  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    name: "webapp",
    host: "localhost",
    port: 80,
    enableHttps: false
  };
  var name = options.name;
  var host = options.host;
  var port = options.port;
  var enableHttps = (_options$enableHttps = options.enableHttps) !== null && _options$enableHttps !== void 0 ? _options$enableHttps : false;
  _http2._http._apps[name] = new _HttpApplication2._HttpApplication(name, host, port, enableHttps);
  return _http2._http._apps[name];
}