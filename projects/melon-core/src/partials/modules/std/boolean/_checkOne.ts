function _checkOne<T>(method: Function, values: T[]) {
    return values
    .map(value => method(value))
    .find(result => result === true) !== null;
}

export { _checkOne }