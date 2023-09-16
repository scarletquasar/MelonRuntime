import { getArgs, getCurrentDir, getEnvVar, getEnvVars, setEnvVar } from "./environment-core";
import { Result } from "./functional-core";
import { deserialize, serialize } from "./json-core";
import { exit, getPid } from "./process-core";
import { Moment } from "./time-core";
import { TextDecoder, TextEncoder } from "./encoding-core";
import { newUuid } from "./encryption-core";

const stdlib = {
    encoding: {
        TextDecoder,
        TextEncoder
    },
    json: {
        serialize,
        deserialize
    },
    time: {
        Moment
    },
    environment: {
        getArgs,
        getCurrentDir,
        getEnvVar,
        getEnvVars,
        setEnvVar
    },
    process: {
        exit,
        getPid
    },
    functional: {
        Result
    },
    encryption: {
        newUuid
    }
}

export { stdlib }