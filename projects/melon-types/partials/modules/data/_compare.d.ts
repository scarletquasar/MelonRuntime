declare function _compare<T>(target: T, value: T, expression?: (a: T, b: T) => boolean, customModifier?: Function): {
    comment: string;
    equals: boolean;
};
export { _compare };
