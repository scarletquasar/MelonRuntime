import { _internalConsts } from "../internalConsts/_internalConsts";
function _compare(target, value, expression = (a, b) => a === b, customModifier = null) {
    const result = {
        comment: "",
        equals: false
    };
    const compareUniques = (target, value) => expression(target, value);
    const compareArrays = (target, value) => {
        const equalityArray = [];
        target.forEach((item, index) => {
            const value1 = item;
            const value2 = value[index];
            const { equals } = _compare(value1, value2, expression, customModifier);
            equalityArray.push(equals);
        });
        return equalityArray.every(item => item === true);
    };
    const compareObjects = (target, value) => {
        return compareArrays(Object.entries(target), Object.entries(value));
    };
    const compareMaps = (target, value) => {
        return compareArrays(Array.from(target.entries()), Array.from(value.entries()));
    };
    const compareSets = (target, value) => {
        return compareArrays(Array.from(target), Array.from(value));
    };
    switch (typeof target) {
        case "string":
        case "number":
        case "boolean":
            const targetLength = target.toString().length;
            const valueLength = value.toString().length;
            if (targetLength != valueLength) {
                result.comment = _internalConsts.COMPARATION_LENGTH_IS_DIFFERENT;
                return result;
            }
            if (!compareUniques(target, value)) {
                result.comment = _internalConsts.COMPARATION_BASE_IS_DIFFERENT;
                return result;
            }
            result.equals = true;
            return result;
        case "object":
            if (Array.isArray(target)) {
                if (target.length != value.length) {
                    result.comment = _internalConsts.COMPARATION_LENGTH_IS_DIFFERENT;
                    return result;
                }
                result.equals = compareArrays(target, value);
                return result;
            }
            if (target.constructor === Set) {
                if (target.size != value.size) {
                    result.comment = _internalConsts.COMPARATION_LENGTH_IS_DIFFERENT;
                    return result;
                }
                result.equals = compareSets(target, value);
                return result;
            }
            if (target.constructor === Map) {
                if (target.size != value.size) {
                    result.comment = _internalConsts.COMPARATION_LENGTH_IS_DIFFERENT;
                    return result;
                }
                result.equals = compareMaps(target, value);
                return result;
            }
            if (target.constructor === Object) {
                if (Object.keys(target).length != Object.keys(value).length) {
                    result.comment = _internalConsts.COMPARATION_LENGTH_IS_DIFFERENT;
                    return result;
                }
                result.equals = compareObjects(target, value);
                return result;
            }
    }
    if (customModifier) {
        const modified = customModifier(target, value);
        return _compare(modified[0], modified[1]);
    }
    throw new TypeError(_internalConsts.NO_SUPPORT_FOR_THE_OBJECT);
}
export { _compare };
