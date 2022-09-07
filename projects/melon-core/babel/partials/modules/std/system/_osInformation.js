"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._osInformation = void 0;

var _dotnet2 = require("../../dotnet/_dotnet");

var _osInformation = {
  platform: _dotnet2._dotnet.getStaticProperty("System:Environment:OSVersion").Platform,
  version: _dotnet2._dotnet.getStaticProperty("System:Environment:OSVersion").VersionString,
  servicePack: _dotnet2._dotnet.getStaticProperty("System:Environment:OSVersion").ServicePack
};
exports._osInformation = _osInformation;