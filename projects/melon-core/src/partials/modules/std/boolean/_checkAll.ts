function _checkAll<T>(method: Function, values: T[]) {
    let results = [];
    values.forEach(value => results.push(method(value)));
    return results.every(result => result === true);
}

export { _checkAll }