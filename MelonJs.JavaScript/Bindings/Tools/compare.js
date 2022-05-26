function compare(value1, value2, cmpFn) {
    if (cmpFn === void 0) { cmpFn = function (a, b) { return a === b; }; }
    var firstConstructor = value1.constructor.name;
    var secondConstructor = value2.constructor.name;
    if (firstConstructor !== secondConstructor)
        return cmpFn(value1, value2);
    var len1 = null;
    var len2 = null;
    switch (firstConstructor) {
        case "Map":
            var map1 = value1;
            var map2 = value2;
            len1 = map1.size;
            len2 = map2.size;
            if (len1 !== len2)
                return false;
            var arrayMap1 = Array.from(map1.entries());
            var arrayMap2 = Array.from(map1.entries());
            return compare(arrayMap1, arrayMap2, cmpFn);
        case "Set":
            var set1 = value1;
            var set2 = value2;
            len1 = set1.size;
            len2 = set2.size;
            if (len1 !== len2)
                return false;
            var setArray1 = Array.from(set1);
            var setArray2 = Array.from(set2);
            return compare(setArray1, setArray2);
        case "Array":
            var array1 = value1;
            var array2 = value2;
            len1 = array1.length;
            len2 = array2.length;
            if (len1 !== len2)
                return cmpFn(len1, len2);
            for (var i = 0; i < (len1 !== null && len1 !== void 0 ? len1 : 0); i++) {
                if (!compare(array1[i], array2[i], cmpFn)) {
                    return cmpFn(array1[i], array2[i]);
                }
            }
            break;
        case "Object":
            var obj1 = value1;
            var obj2 = value2;
            var objArray1 = Object.entries(obj1);
            var objArray2 = Object.entries(obj2);
            len1 = objArray1.length;
            len2 = objArray2.length;
            if (len1 !== len2)
                return cmpFn(len1, len2);
            return compare(objArray1, objArray2, cmpFn);
        default:
            return cmpFn(value1.toString(), value2.toString());
    }
    return true;
}