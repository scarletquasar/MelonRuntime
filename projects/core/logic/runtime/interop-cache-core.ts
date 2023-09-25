import { getStaticMethod, getStaticProperty } from 'logic/api/modules/interop/interop-core';
import { UUID } from "types/internal/generic-types";

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
        exit: _$internalBinding["ProcessExit"],
        getCurrentProcess: getStaticMethod<any>("System.Diagnostics:Process:GetCurrentProcess")
    },
    guid: {
        newGuid: _$internalBinding["NewGuid"]
    },
    web: {
        request: _$internalBinding["HttpRequest"]
    }
}

export { interopCache }