import { getStaticMethod } from "../../dotnet/dotnet-interop-core";

function _getEnvironmentVariables(): Record<string, any> {
    const localEnv = _$internalBinding["LocalEnvironmentVariables"];
    const processEnv = getStaticMethod<Record<string, any>>("System:Environment:GetEnvironmentVariables")();

    return Object.assign(localEnv, processEnv);
}

export { _getEnvironmentVariables }