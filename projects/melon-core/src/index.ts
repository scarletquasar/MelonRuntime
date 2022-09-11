import { _Map } from "./partials/constructors/_Map"
import { _Set } from "./partials/constructors/_Set"
import { _Version } from "./partials/constructors/_Version"
import { _console } from "./partials/modules/console/_console"
import { _data } from "./partials/modules/data/_data"
import { _dotnet } from "./partials/modules/dotnet/_dotnet"
import { _fs } from "./partials/modules/fs/_fs"
import { _guards } from "./partials/modules/guards/_guards"
import { _http } from "./partials/modules/http/_http"
import { _std } from "./partials/modules/std/_std"

const Melon = {
    std: _std,
    data: _data,
    guards: _guards,
    fs: _fs,
    http: _http,
    dotnet: _dotnet,
    Version: _Version
}

globalThis.console = _console as any;
globalThis.Map = _Map as any;
globalThis.Set = _Set as any;

globalThis.Melon = Melon;