import { _std } from "../std/_std";
import { ConsoleColor } from "../../../types/console/ConsoleColor";
import { _getStaticMethod } from "../dotnet/_getStaticMethod";

function _writeLine(target: any, color: ConsoleColor = "White") {
    const serialize = _getStaticMethod<string>("Newtonsoft.Json:JsonConvert:SerializeObject");
    const log = _getStaticMethod("Cli.NET.Tools:CLNConsole:WriteLine");

    log(serialize(target), color);
}

export { _writeLine }