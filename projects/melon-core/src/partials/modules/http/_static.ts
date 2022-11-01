import { _getStaticMethod } from "../dotnet/_getStaticMethod";
import { _std } from "../std/_std"

function _static(response: any, type: `${string}/${string}`, headers: Record<string, any> = {}) {
    const serialize = _getStaticMethod("Newtonsoft.Json:JsonConvert:SerializeObject");
    return {
        status: 200,
        response,
        headers: serialize({
            "Content-Type": type,
            ...headers
        })
    }
}

export { _static }