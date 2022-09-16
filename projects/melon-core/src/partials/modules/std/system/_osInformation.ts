import { _dotnet } from "../../dotnet/_dotnet";
import { Platform } from "../enums/Platform";

type internalOSVersion = {
    Platform: Platform,
    VersionString: string,
    ServicePack: string
}

const _osInformation = {
    platform: _dotnet.getStaticProperty<internalOSVersion>("System:Environment:OSVersion").Platform,
    version: _dotnet.getStaticProperty<internalOSVersion>("System:Environment:OSVersion").VersionString,
    servicePack: _dotnet.getStaticProperty<internalOSVersion>("System:Environment:OSVersion").ServicePack
}

export { _osInformation }