/* tryParse(json)
/  Tries to parse a JSON string, if it fails, returns an empty object.
/  **Warning:** This is an experimental function.
/  
/  json: JSON string that will be parsed
*/
function _tryParse<T>(json: string) {
    try {
        return JSON.parse(json) as T;
    }
    catch {
        return {} as T;
    }
}

export { _tryParse }