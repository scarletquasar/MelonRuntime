import { getStaticMethod } from "../dotnet/dotnet-interop-core";
import { _std } from "../std/_std"

function _static(response: any, type: `${string}/${string}`, headers: Record<string, any> = {}) {
    const serialize = getStaticMethod("Newtonsoft.Json:JsonConvert:SerializeObject");
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