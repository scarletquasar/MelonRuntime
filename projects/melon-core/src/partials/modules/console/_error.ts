import { _getStaticMethod } from "../dotnet/_getStaticMethod";
import { _std } from "../std/_std";

function _error(...args: any[]) {
    const serialize = _getStaticMethod("Newtonsoft.Json:JsonConvert:SerializeObject");
    const log = _getStaticMethod("Cli.NET.Tools:CLNConsole:WriteLine");

    Array.from(args).forEach(object => {
        const serialized = serialize(object);
        log(serialized, "Red");
    });
}

export { _error }