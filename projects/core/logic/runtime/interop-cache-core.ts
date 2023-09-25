import { getStaticMethod, getStaticProperty } from 'logic/api/modules/interop/interop-core';
import { UUID } from "types/internal/generic-types";

const interopCache = {
    serialization: {
        serialize: getStaticMethod<string>("System.Text.Json:JsonSerializer:Serialize").unwrap()
    },
    console: {
        write: getStaticMethod<void>("System:Console:WriteLine").unwrap(),
        clear: getStaticMethod<void>("System:Console:Clear").unwrap(),
        read: getStaticMethod<string | null>("System:Console:ReadLine").unwrap()
    },
    io: {
        getFiles: getStaticMethod<string[]>("System.IO:Directory:GetFiles").unwrap()
    },
    environment: {
        getCommandLineArgs: getStaticMethod<string[]>("System:Environment:GetCommandLineArgs").unwrap(),
        currentDirectory: getStaticProperty<string>("System:Environment:CurrentDirectory").unwrap(),
        getEnvironmentVariables: getStaticMethod<Record<string, any>>("System:Environment:GetEnvironmentVariables").unwrap(),
        getEnvironmentVariable: getStaticMethod<string>("System:Environment:GetEnvironmentVariable").unwrap(),
        setEnvironmentVariable: getStaticMethod<void>("System:Environment:SetEnvironmentVariable").unwrap()
    },
    process: {
        exit: _$internalBinding["ProcessExit"],
        getCurrentProcess: getStaticMethod<any>("System.Diagnostics:Process:GetCurrentProcess").unwrap()
    },
    guid: {
        newGuid: _$internalBinding["NewGuid"]
    },
    web: {
        request: _$internalBinding["HttpRequest"]
    }
}

export { interopCache }