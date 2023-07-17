import { getStaticProperty } from "../../dotnet/dotnet-interop-core";
import { InternalOSVersion } from "../../../../../../types/internal/system-types";

const osInformation = [
    "Platform",
    "VersionString",
    "ServicePack" 
]
.map(item => [
    `${item[0].toLowerCase()}${item.substring(1)}`,
    getStaticProperty<InternalOSVersion>("System:Environment:OSVersion")[item]
])
.reduce((acc, val) => ({ ...acc, [<any>val[0]]: val[1]}), {});

export { osInformation }