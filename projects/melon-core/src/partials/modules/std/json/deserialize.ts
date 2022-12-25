function deserialize<T>(value: string) {
    return _$internalBinding["Deserialize"](value) as T;
}

export { deserialize }