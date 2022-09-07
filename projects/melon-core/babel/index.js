"use strict";

var _console2 = require("./partials/modules/console/_console");

var _data2 = require("./partials/modules/data/_data");

var _dotnet2 = require("./partials/modules/dotnet/_dotnet");

var _fs2 = require("./partials/modules/fs/_fs");

var _guards2 = require("./partials/modules/guards/_guards");

var _http2 = require("./partials/modules/http/_http");

var _std2 = require("./partials/modules/std/_std");

var Melon = {
  console: _console2._console,
  std: _std2._std,
  data: _data2._data,
  guards: _guards2._guards,
  fs: _fs2._fs,
  http: _http2._http,
  dotnet: _dotnet2._dotnet
};
globalThis.Melon = Melon;