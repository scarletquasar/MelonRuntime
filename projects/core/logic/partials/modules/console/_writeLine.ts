import { _std } from "../std/_std";
import { ConsoleColor } from "../../../../../types/internal/console-types";
import { getStaticMethod } from "../dotnet/dotnet-interop-core";

function _writeLine(target: any, color: ConsoleColor = "White") {
    const log = getStaticMethod<void>("Cli.NET.Tools:CLNConsole:WriteLine");
    
    if(typeof target != "string") {
        const serialize = getStaticMethod<string>("Newtonsoft.Json:JsonConvert:SerializeObject");
    
        log(serialize(target), color);
        return;
    }

    log(target, color);
}

export { _writeLine }