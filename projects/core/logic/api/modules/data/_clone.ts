function _clone<T>(value: T): T {
    return _$internalBinding["DeepClone"](value);
}

export { _clone }