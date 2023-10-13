import { getStaticMethod, getStaticProperty } from 'logic/api/modules/interop/interop-core';

const interopCache = {
    serialization: {
        serialize: getStaticMethod<string>("System.Text.Json:JsonSerializer:Serialize").unwrap(true)
    },
    console: {
        write: getStaticMethod<void>("System:Console:WriteLine").unwrap(true),
        clear: getStaticMethod<void>("System:Console:Clear").unwrap(true),
        read: getStaticMethod<string | null>("System:Console:ReadLine").unwrap(true)
    },
    io: {
        //TODO: FIX IT, COMING NULL
        getFiles: getStaticMethod<string[]>("System.IO:Directory:GetFiles").unwrap()
    },
    environment: {
        getCommandLineArgs: getStaticMethod<string[]>("System:Environment:GetCommandLineArgs").unwrap(true),
        currentDirectory: getStaticProperty<string>("System:Environment:CurrentDirectory").unwrap(true),
        getEnvironmentVariables: getStaticMethod<Record<string, any>>("System:Environment:GetEnvironmentVariables").unwrap(true),
        getEnvironmentVariable: getStaticMethod<string>("System:Environment:GetEnvironmentVariable").unwrap(true),
        setEnvironmentVariable: getStaticMethod<void>("System:Environment:SetEnvironmentVariable").unwrap(true)
    },
    process: {
        exit: _$internalBinding["ProcessExit"],
        getCurrentProcess: getStaticMethod<any>("System.Diagnostics:Process:GetCurrentProcess").unwrap(true)
    },
    guid: {
        newGuid: _$internalBinding["NewGuid"]
    },
    web: {
        request: _$internalBinding["HttpRequest"]
    }
}

export { interopCache }