import { _Version } from "../../constructors/_Version";
import { _nextTick } from "./async/_nextTick";
import { _checkAll } from "./boolean/_checkAll";
import { _checkOne } from "./boolean/_checkOne";
import { _baseDirectory } from "./environment/_baseDirectory";
import { _clearLocalEnvironmentVariables } from "./environment/_clearLocalEnvironmentVariables";
import { _getEnvironmentVariables } from "./environment/_getEnvironmentVariables";
import { _setEnvironmentVariable } from "./environment/_setEnvironmentVariable";
import { _tryParse } from "./json/_tryParse";
import { _tryStringify } from "./json/_tryStringify";
import { _argv } from "./process/_argv";
import { _env } from "./process/_env";
import { _exit } from "./process/_exit";
import { _osInformation } from "./system/_osInformation";
import { _setInterval } from "./time/_setInterval";
import { _setTimeout } from "./time/_setTimeout";
import { _Timer } from "./time/_Timer";
import { _shift } from "./_shift";

const _std = {
    shift: _shift,
    async: {
        nextTick: _nextTick
    },
    melon: {
        currentVersion: new _Version()
    },
    boolean: {
        checkAll: _checkAll,
        checkOne: _checkOne
    },
    json: {
        tryParse: _tryParse,
        tryStringify: _tryStringify
    },
    time: {
        _timers: [],
        setInterval: _setInterval,
        setTimeout: _setTimeout,
        Timer: _Timer
    },
    system: {
        osInformation: _osInformation
    },
    environment: {
        baseDirectory: _baseDirectory,
        getEnvironmentVariables: _getEnvironmentVariables,
        setEnvironmentVariable: _setEnvironmentVariable,
        clearLocalEnvironmentVariables: _clearLocalEnvironmentVariables
    },
    process: {
        argv: _argv,
        env: _env,
        exit: _exit
    }
}

export { _std }