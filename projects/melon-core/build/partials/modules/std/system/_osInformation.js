import { _dotnet } from "../../dotnet/_dotnet";
const _osInformation = {
    platform: _dotnet.getStaticProperty("System:Environment:OSVersion").Platform,
    version: _dotnet.getStaticProperty("System:Environment:OSVersion").VersionString,
    servicePack: _dotnet.getStaticProperty("System:Environment:OSVersion").ServicePack
};
export { _osInformation };
