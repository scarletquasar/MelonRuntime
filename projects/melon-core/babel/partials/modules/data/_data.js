"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._data = void 0;

var _MySqlClient2 = require("./constructors/_MySqlClient");

var _PgClient2 = require("./constructors/_PgClient");

var _SqlServerClient2 = require("./constructors/_SqlServerClient");

var _clone2 = require("./_clone");

var _compare2 = require("./_compare");

var _data = {
  clone: _clone2._clone,
  compare: _compare2._compare,
  PgClient: _PgClient2._PgClient,
  MySqlClient: _MySqlClient2._MySqlClient,
  SqlServerClient: _SqlServerClient2._SqlServerClient
};
exports._data = _data;