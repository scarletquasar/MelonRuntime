function _checkAll(method, values) {
    let results = [];
    values.forEach(value => results.push(method(value)));
    return results.every(result => result === true);
}
export { _checkAll };
