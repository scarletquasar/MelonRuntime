function _checkAll<T>(method: Function, values: T[]) {
    return values
        .map(value => method(value))
        .every(result => result === true);
}

export { _checkAll }