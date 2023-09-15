import { _Version } from "../../constructors/_Version";
import { _baseDirectory } from "./environment/_baseDirectory";
import { _clearLocalEnvironmentVariables } from "./environment/_clearLocalEnvironmentVariables";
import { _getEnvironmentVariables } from "./environment/_getEnvironmentVariables";
import { _setEnvironmentVariable } from "./environment/_setEnvironmentVariable";
import { _argv } from "./process/_argv";
import { _exit } from "./process/_exit";
import { TextDecoder } from "./TextDecoder";
import { TextEncoder } from "./TextEncoder";
import { json } from "./json/json";
import { Moment } from "./time/time-core";

const stdlib = {
    encoding: {
        TextDecoder,
        TextEncoder
    },
    json,
    time: {
        Moment
    },
    environment: {
        baseDirectory: _baseDirectory,
        getEnvironmentVariables: _getEnvironmentVariables,
        setEnvironmentVariable: _setEnvironmentVariable,
        clearLocalEnvironmentVariables: _clearLocalEnvironmentVariables
    },
    process: {
        argv: _argv,
        exit: _exit
    }
}

export { stdlib }