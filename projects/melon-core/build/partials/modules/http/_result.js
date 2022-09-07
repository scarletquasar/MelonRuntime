import { _std } from "../std/_std";
function _result(statusCode, response = {}) {
    return {
        type: "application/json",
        status: statusCode,
        response: _std.json.tryStringify(response)
    };
}
export { _result };
