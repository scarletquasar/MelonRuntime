import { _dotnet } from "../../dotnet/_dotnet";

function _getEnvironmentVariables() {
    const localEnv = _$internalBinding["LocalEnvironmentVariables"];
    const processEnv = 
        _dotnet.getStaticMethod<Record<string, any>>("System:Environment:GetEnvironmentVariables")();

    return Object.assign(localEnv, processEnv);
}

export { _getEnvironmentVariables }