import { getArgs, getCurrentDir, getEnvVar, getEnvVars, setEnvVar } from "./environment-core";
import { Result } from "./functional-core";
import { deserialize, serialize } from "./json-core";
import { exit, getPid } from "./process-core";
import { Moment, now } from "./time-core";
import { ByteEncoding } from "./encoding-core";
import { newUuid } from "./encryption-core";

const stdlib = {
    encoding: {
        ByteEncoding,
    },
    json: {
        serialize,
        deserialize
    },
    time: {
        Moment,
        now
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
    crypt: {
        newUuid
    }
}

export { stdlib }