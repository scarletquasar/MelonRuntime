import { getStaticMethod, getStaticProperty } from "logic/api/modules/dotnet/dotnet-interop-core";

const interopCache = {
    serialization: {
        serialize: getStaticMethod<string>("System.Text.Json:JsonSerializer:Serialize")
    },
    console: {
        write: getStaticMethod<void>("System:Console:WriteLine"),
        clear: getStaticMethod<void>("System:Console:Clear"),
        read: getStaticMethod<string | null>("System:Console:ReadLine")
    },
    io: {
        getFiles: getStaticMethod<string[]>("System.IO:Directory:GetFiles")
    },
    environment: {
        getCommandLineArgs: getStaticMethod<string[]>("System:Environment:GetCommandLineArgs"),
        currentDirectory: getStaticProperty<string>("System:Environment:CurrentDirectory"),
        getEnvironmentVariables: getStaticMethod<Record<string, any>>("System:Environment:GetEnvironmentVariables"),
        getEnvironmentVariable: getStaticMethod<string>("System:Environment:GetEnvironmentVariable"),
        setEnvironmentVariable: getStaticMethod<void>("System:Environment:SetEnvironmentVariable")
    },
    process: {
        exit: getStaticMethod<never>("System:Environment:Exit"),
        getCurrentProcess: getStaticMethod<any>("System.Diagnostics:Process:GetCurrentProcess")
    }
}

export { interopCache }