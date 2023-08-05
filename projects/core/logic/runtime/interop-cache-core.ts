import { getStaticMethod } from "logic/partials/modules/dotnet/dotnet-interop-core";

const interopCache = {
    serialization: {
        serialize: getStaticMethod<string>("System.Text.Json:JsonSerializer:Serialize")
    },
    console: {
        writeLine: getStaticMethod<void>("System:Console:WriteLine"),
        write: getStaticMethod<void>("System:Console:WriteLine"),
        clear: getStaticMethod<void>("System:Console:Clear")
    },
    clinet: {
        writeLine: getStaticMethod<void>("Cli.NET.Tools:CLNConsole:WriteLine"),
        write: getStaticMethod<void>("Cli.NET.Tools:CLNConsole:Write")
    },
    io: {
        getFiles: getStaticMethod<string[]>("System.IO:Directory:GetFiles")
    }
}

export { interopCache }