/* checkOne(method, values)
/  Check one the condition (the first) using a lambda expression, if 
/  true, returns true, otherwise, returns false.
/  
/  method: function that will be executed to get the condition
/  values: elements to be tested with method
*/
function _checkOne<T>(method: Function, values: T[]) {
    let results = [];
    values.forEach(value => results.push(method(value)));
    return results.find(result => result === true) !== null;
}

export { _checkOne }