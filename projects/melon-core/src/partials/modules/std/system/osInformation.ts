import { getStaticProperty } from "../../dotnet/getStaticProperty";

type InternalOSVersion = {
    Platform: Platform,
    VersionString: string,
    ServicePack: string
}

enum Platform {
    Win32S,
    Win32Windows,
    Win32NT,
    WinCE,
    Unix,
    Xbox,
    MacOSX,
    Other
}

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