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
import { SharedBag } from "./SharedBag";
import { osInformation } from "./system/osInformation";
import { TextDecoder } from "./TextDecoder";
import { TextEncoder } from "./TextEncoder";
import { Timer } from "./time/Timer";
import { _clearInterval } from "./time/_clearInterval";
import { _clearTimeout } from "./time/_clearTimeout";
import { _setInterval } from "./time/_setInterval";
import { _setTimeout } from "./time/_setTimeout";
import { shift } from "./shift";
import { deserialize } from "./json/deserialize";
import { serialize } from "./json/serialize";
import { tryDeserialize } from "./json/tryDeserialize";
import { trySerialize } from "./json/trySerialize";

const _std = {
    SharedBag,
    TextDecoder,
    TextEncoder,
    shift,
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
        tryStringify: _tryStringify,
        deserialize,
        serialize,
        tryDeserialize,
        trySerialize
    },
    time: {
        _timers: new Array<Timer>(),
        setInterval: _setInterval,
        setTimeout: _setTimeout,
        clearTimeout: _clearTimeout,
        clearInterval: _clearInterval,
        Timer
    },
    system: {
        osInformation
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