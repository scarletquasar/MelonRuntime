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
import { testing } from "./partials/modules/testing/testing"

getEnv();
addPrototypeExtension(Object, "$", $);

const Melon = {
    testing,
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

const { console, crypto, fs } = Melon;
const { fetch } = Melon.http;
const { TextEncoder, TextDecoder } = Melon.std;
const { setTimeout, setInterval, clearTimeout, clearInterval } = Melon.std.time;

const globalExpositions = {
    console,
    crypto,
    fs,
    setTimeout,
    setInterval,
    clearTimeout,
    clearInterval,
    fetch,
    TextDecoder,
    TextEncoder,
    Melon
}

Object.entries(globalExpositions).forEach(entry => {
    globalThis[entry[0]] = entry[1];
});

export { Melon }