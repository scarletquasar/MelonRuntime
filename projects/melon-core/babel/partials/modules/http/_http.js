"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._http = void 0;

var _app2 = require("./_app");

var _request2 = require("./_request");

var _result2 = require("./_result");

var _static2 = require("./_static");

var _http = {
  _apps: {},
  request: _request2._request,
  app: _app2._app,
  result: _result2._result,
  "static": _static2._static
};
exports._http = _http;