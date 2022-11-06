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
import { _crypto } from "./partials/statics/_Crypto"
import { $ } from "./partials/utils/$"
import { addPrototypeExtension } from "./partials/utils/addPrototypeExtension"
import { getEnv } from "./partials/utils/getEnv"

getEnv();

const Melon = {
    std: _std,
    data: _data,
    guards: _guards,
    fs: _fs,
    http: _http,
    dotnet: _dotnet,
    crypto: _crypto,
    console: _console,
    Version: _Version
}

addPrototypeExtension(Object, "$", $);

globalThis.console = Melon.console as any;
globalThis.crypto = Melon.crypto;
globalThis.fs = Melon.fs;

globalThis.setTimeout = Melon.std.time.setTimeout as any;
globalThis.setInterval = Melon.std.time.setInterval as any;
globalThis.fetch = Melon.http.fetch;

globalThis.Map = _Map as any;
globalThis.Set = _Set as any;

globalThis.Melon = Melon;

export { Melon }