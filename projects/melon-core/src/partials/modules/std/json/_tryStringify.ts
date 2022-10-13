/* tryStringify(object)
/  Tries to stringify a JSON object, if it fails, returns an empty string.
/  **Warning:** This is an experimental function.
/  
/  object: object that will be stringified
*/
function _tryStringify<T>(target: T) {
    try {
        return JSON.stringify(target);
    }
    catch {
        return "";
    }
}

export { _tryStringify }