import { _getStaticMethod } from "../dotnet/_getStaticMethod";
import { _std } from "../std/_std"

function _result(statusCode: number, response: any = {}, headers: Record<string, any> = {}) {
    const serialize = _getStaticMethod("Newtonsoft.Json:JsonConvert:SerializeObject");
    return {
        status: statusCode,
        response: serialize(response),
        headers: serialize({
            "Content-Type": "application/json",
            ...headers
        })
    }
}

export { _result }