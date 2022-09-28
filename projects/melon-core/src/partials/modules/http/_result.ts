import { _std } from "../std/_std"

function _result(statusCode: number, response: any = {}, headers: Record<string, any> = {}) {
    return {
        status: statusCode,
        response: _std.json.tryStringify(response),
        headers: {
            "Content-Type": "application/json",
            ...headers
        }
    }
}

export { _result }