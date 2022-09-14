import { _std } from "../_std";

function _setEnvironmentVariable(key: string, value: any) {
    _$internalBinding["LocalEnvironmentVariables"][key] = value;
    _std.process.env[key] = value;
}

export { _setEnvironmentVariable }