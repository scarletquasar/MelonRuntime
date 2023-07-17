import { getStaticMethod } from "../dotnet/dotnet-interop-core";
import { _std } from "../std/_std";

function _error(...args: any[]) {
    const serialize = getStaticMethod<string>("Newtonsoft.Json:JsonConvert:SerializeObject");
    const log = getStaticMethod("Cli.NET.Tools:CLNConsole:WriteLine");

    Array.from(args).forEach(object => {
        const serialized = serialize(object)
            .replaceAll("\\n", "\n")
            .replaceAll("\\r", "\r");

        log(serialized, "Red");
    });
}

export { _error }