/* checkAll(method, values)
/  Check all the conditions using a lambda expression, if they're 
/  true, returns true, otherwise, returns false.
/  
/  method: function that will be executed to get the condition
/  values: elements to be tested with method
*/
function _checkAll<T>(method: Function, values: T[]) {
    let results = [];
    values.forEach(value => results.push(method(value)));
    return results.every(result => result === true);
}

export { _checkAll }