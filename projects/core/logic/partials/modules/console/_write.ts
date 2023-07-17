import { _std } from "../std/_std";
import { ConsoleColor } from "../../../../../types/internal/console-types";
import { getStaticMethod } from "../dotnet/dotnet-interop-core";

function _write(target: any, color: ConsoleColor = "White") {
    const log = getStaticMethod<void>("Cli.NET.Tools:CLNConsole:Write");
    
    if(typeof target != "string") {
        const serialize = getStaticMethod<string>("Newtonsoft.Json:JsonConvert:SerializeObject");
    
        log(serialize(target), color);
        return;
    }

    log(target, color);
}

export { _write }