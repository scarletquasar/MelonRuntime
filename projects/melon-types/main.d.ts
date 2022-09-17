import { Console } from "./console/Console"
import { Version } from "./constructors/Version"
import { Data } from "./data/Data"
import { Dotnet } from "./dotnet/Dotnet"
import { Fs } from "./fs/Fs"
import { Guards } from "./guards/Guards"
import { Http } from "./http/Http"
import { Std } from "./std/Std"

declare const Melon: {
    std: Std,
    http: Http,
    guards: Guards,
    dotnet: Dotnet,
    fs: Fs,
    data: Data,
    Version: Version
}

declare const console: Console;