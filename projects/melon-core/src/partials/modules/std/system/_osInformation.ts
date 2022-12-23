import { getStaticProperty } from "../../dotnet/getStaticProperty";
import { _dotnet } from "../../dotnet/_dotnet";
import { Platform } from "../enums/Platform";

type InternalOSVersion = {
    Platform: Platform,
    VersionString: string,
    ServicePack: string
}

const _osInformation = [
    "Platform",
    "VersionString",
    "ServicePack" 
]
.map(item => [
    `${item[0].toLowerCase()}${item.substring(1)}`,
    getStaticProperty<InternalOSVersion>("System:Environment:OSVersion")[item]
])
.reduce((acc, val) => ({ ...acc, [<any>val[0]]: val[1]}), {});

export { _osInformation }