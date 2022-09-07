function _checkOne(method, values) {
    let results = [];
    values.forEach(value => results.push(method(value)));
    return results.find(result => result === true) !== null;
}
export { _checkOne };
