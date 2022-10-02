import { _std } from "../std/_std"

function _result(statusCode: number, response: any = {}, headers: Record<string, any> = {}) {
    return {
        status: statusCode,
        response: JSON.stringify(response),
        headers: JSON.stringify({
            "Content-Type": "application/json",
            ...headers
        })
    }
}

export { _result }