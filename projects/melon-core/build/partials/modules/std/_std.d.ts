import { _Version } from "../../constructors/_Version";
import { _checkAll } from "./boolean/_checkAll";
import { _checkOne } from "./boolean/_checkOne";
import { _clearLocalEnvironmentVariables } from "./environment/_clearLocalEnvironmentVariables";
import { _getEnvironmentVariables } from "./environment/_getEnvironmentVariables";
import { _setEnvironmentVariable } from "./environment/_setEnvironmentVariable";
import { _tryParse } from "./json/_tryParse";
import { _tryStringify } from "./json/_tryStringify";
import { _setInterval } from "./time/_setInterval";
import { _setTimeout } from "./time/_setTimeout";
import { _shift } from "./_shift";
declare const _std: {
    shift: typeof _shift;
    melon: {
        currentVersion: _Version;
        loadedModules: string[];
    };
    boolean: {
        checkAll: typeof _checkAll;
        checkOne: typeof _checkOne;
    };
    json: {
        tryParse: typeof _tryParse;
        tryStringify: typeof _tryStringify;
    };
    time: {
        _timers: any[];
        setInterval: typeof _setInterval;
        setTimeout: typeof _setTimeout;
    };
    system: {
        osInformation: {
            platform: number;
            version: string;
            servicePack: string;
        };
    };
    environment: {
        baseDirectory: string;
        getEnvironmentVariables: typeof _getEnvironmentVariables;
        setEnvironmentVariable: typeof _setEnvironmentVariable;
        clearLocalEnvironmentVariables: typeof _clearLocalEnvironmentVariables;
    };
    process: {
        argv: string[];
        env: Record<string, any>;
        exit: () => void;
    };
};
export { _std };
