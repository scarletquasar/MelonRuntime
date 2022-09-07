"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._Version = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _Version = /*#__PURE__*/function () {
  function _Version() {
    var major = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var minor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var patch = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

    _classCallCheck(this, _Version);

    _defineProperty(this, "major", 0);

    _defineProperty(this, "minor", 0);

    _defineProperty(this, "patch", 0);

    this.major = major;
    this.minor = minor;
    this.patch = patch;
  }

  _createClass(_Version, [{
    key: "toString",
    value: function toString() {
      return "".concat(this.major, ".").concat(this.minor, ".").concat(this.patch);
    }
  }]);

  return _Version;
}();

exports._Version = _Version;