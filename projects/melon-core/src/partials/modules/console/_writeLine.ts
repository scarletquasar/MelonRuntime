import { _std } from "../std/_std";
import { ConsoleColor } from "../../../types/console/ConsoleColor";
import { getStaticMethod } from "../dotnet/getStaticMethod";

function _writeLine(target: any, color: ConsoleColor = "White") {
    const serialize = getStaticMethod<string>("Newtonsoft.Json:JsonConvert:SerializeObject");
    const log = getStaticMethod<void>("Cli.NET.Tools:CLNConsole:WriteLine");

    log(serialize(target), color);
}

export { _writeLine }