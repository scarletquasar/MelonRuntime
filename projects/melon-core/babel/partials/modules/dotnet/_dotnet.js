"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._dotnet = void 0;

var _getLoadedAssemblies2 = require("./_getLoadedAssemblies");

var _getStaticMethod2 = require("./_getStaticMethod");

var _getStaticProperty2 = require("./_getStaticProperty");

var _loadAssembly2 = require("./_loadAssembly");

var _Realm2 = require("./constructors/_Realm");

var _removeAssembly2 = require("./_removeAssembly");

var _types2 = require("./_types");

var _dotnet = {
  getStaticMethod: _getStaticMethod2._getStaticMethod,
  getStaticProperty: _getStaticProperty2._getStaticProperty,
  loadAssembly: _loadAssembly2._loadAssembly,
  removeAssembly: _removeAssembly2._removeAssembly,
  getLoadedAssemblies: _getLoadedAssemblies2._getLoadedAssemblies,
  types: _types2._types,
  Realm: _Realm2._Realm
};
exports._dotnet = _dotnet;