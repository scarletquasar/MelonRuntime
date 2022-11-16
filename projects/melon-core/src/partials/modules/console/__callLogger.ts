import { ConsoleColor } from "../../../types/console/ConsoleColor";
import { _getStaticMethod } from "../dotnet/_getStaticMethod";

function __callLogger(color: ConsoleColor, args: any[]) {
    const serialize = _getStaticMethod<string>("Newtonsoft.Json:JsonConvert:SerializeObject");
    const log = _getStaticMethod("Cli.NET.Tools:CLNConsole:WriteLine");

    const argsIndex = args.length;

    for(let currentIndex = 0; currentIndex < argsIndex; currentIndex++) {
        const current = args[currentIndex];
        const serialized = serialize(current);

        //Info: If the serialized argument is a function, that means
        //that needs to be fixed, in order to be exposed to the logger
        if(current instanceof Function) {
            const fixed = serialized
                .replaceAll("\\n", "\n")
                .replaceAll("\\r", "\r");

            log(fixed, color);
            break;
        }

        log(current, color);
    }
}

export { __callLogger }