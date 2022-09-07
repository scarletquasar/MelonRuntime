import { _std } from "../_std";
function _setEnvironmentVariable(key, value) {
    _$internalBinding["LocalEnvironmentVariables"][key] = value;
    _std.process.env[key] = value;
}
export { _setEnvironmentVariable };
