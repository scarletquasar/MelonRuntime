"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._Set = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

var _entries = /*#__PURE__*/new WeakMap();

var _Set = /*#__PURE__*/function () {
  function _Set(baseEntries) {
    var _this = this;

    _classCallCheck(this, _Set);

    _classPrivateFieldInitSpec(this, _entries, {
      writable: true,
      value: void 0
    });

    _defineProperty(this, "size", void 0);

    _classPrivateFieldSet(this, _entries, []);

    this.size = 0;

    if (baseEntries) {
      baseEntries.forEach(function (entry) {
        if (!_classPrivateFieldGet(_this, _entries).includes(entry)) {
          _classPrivateFieldGet(_this, _entries).push(entry);
        }
      });
    }
  }

  _createClass(_Set, [{
    key: "entries",
    value: function entries() {
      return _classPrivateFieldGet(this, _entries).map(function (x) {
        return [x, x];
      });
    }
  }, {
    key: "has",
    value: function has(value) {
      return _classPrivateFieldGet(this, _entries).indexOf(value) != -1;
    }
  }, {
    key: "add",
    value: function add(value) {
      if (!this.has(value)) {
        this.size++;

        _classPrivateFieldGet(this, _entries).push(value);
      }
    }
  }, {
    key: "delete",
    value: function _delete(value) {
      if (this.has(value)) this.size--;

      _classPrivateFieldSet(this, _entries, _classPrivateFieldGet(this, _entries).filter(function (x) {
        return x != value;
      }));
    }
  }, {
    key: "clear",
    value: function clear() {
      _classPrivateFieldSet(this, _entries, []);
    }
  }, {
    key: "forEach",
    value: function forEach(callback) {
      _classPrivateFieldGet(this, _entries).forEach(callback);
    }
  }]);

  return _Set;
}();

exports._Set = _Set;