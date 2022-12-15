import { getStaticMethod } from "../dotnet/getStaticMethod";
import { _std } from "../std/_std";

function _warn(...args: any[]) {
    const serialize = getStaticMethod<string>("Newtonsoft.Json:JsonConvert:SerializeObject");
    const log = getStaticMethod<void>("Cli.NET.Tools:CLNConsole:WriteLine");

    Array.from(args).forEach(object => {
        const serialized = serialize(object)
            .replaceAll("\\n", "\n")
            .replaceAll("\\r", "\r");

        log(serialized, "Yellow");
    });
}

export { _warn }