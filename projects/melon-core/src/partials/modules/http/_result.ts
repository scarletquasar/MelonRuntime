import { _std } from "../std/_std"

function _result(statusCode: number, response: any = {}) {
    return {
        type: "application/json",
        status: statusCode,
        response: _std.json.tryStringify(response)
    }
}

export { _result }