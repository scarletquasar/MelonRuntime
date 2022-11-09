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
import { _crypto } from "./partials/statics/_crypto"
import { $ } from "./partials/utils/generic/$"
import { addPrototypeExtension } from "./partials/utils/generic/addPrototypeExtension"
import { getEnv } from "./partials/utils/environment/getEnv"
import { TextEncoder } from "./partials/utils/generic/TextEncoder"
import { TextDecoder } from "./partials/utils/generic/TextDecoder"

getEnv();
addPrototypeExtension(Object, "$", $);

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

globalThis.console = <any>Melon.console;
globalThis.crypto = Melon.crypto;
globalThis.fs = Melon.fs;

globalThis.setTimeout = <any>Melon.std.time.setTimeout;
globalThis.setInterval = <any>Melon.std.time.setInterval;
globalThis.fetch = Melon.http.fetch;

globalThis.Map = <any>_Map;
globalThis.Set = <any>_Set;
globalThis.TextEncoder = TextEncoder;
globalThis.TextDecoder = TextDecoder;

globalThis.Melon = Melon;

export { Melon }