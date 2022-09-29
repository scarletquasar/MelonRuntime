import { _std } from "../std/_std"

function _static(response: any, type: `${string}/${string}`, headers: Record<string, any> = {}) {
    return {
        status: 200,
        response,
        headers: JSON.stringify({
            "Content-Type": type,
            ...headers
        })
    }
}

export { _static }