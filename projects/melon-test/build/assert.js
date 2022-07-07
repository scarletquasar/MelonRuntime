"use strict";
exports.__esModule = true;
exports.Assert = void 0;
var Assert = {
    "true": function (target) { return target; },
    "false": function (target) { return !target; },
    truthy: function (target) { return Boolean(target); },
    falsy: function (target) { return !Boolean(target); },
    "null": function (target) { return target === null; },
    notNull: function (target) { return target !== null; },
    arrayIsEmpty: function (target) { return target.length === 0; },
    arrayIsNotEmpty: function (target) { return target.length > 0; },
    objectIsEmpty: function (target) { return Object.keys(target).length === 0; },
    objectIsNotEmpty: function (target) { return Object.keys(target).length > 0; },
    equals: function (target1, target2) { return data.compare(target1, target2, function (x, y) { return x === y; }); },
    notEquals: function (target1, target2) { return !data.compare(target1, target2, function (x, y) { return x !== y; }); }
};
exports.Assert = Assert;
