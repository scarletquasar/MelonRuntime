import { _console } from "./partials/modules/console/_console";
import { _data } from "./partials/modules/data/_data";
import { _dotnet } from "./partials/modules/dotnet/_dotnet";
import { _fs } from "./partials/modules/fs/_fs";
import { _guards } from "./partials/modules/guards/_guards";
import { _http } from "./partials/modules/http/_http";
import { _std } from "./partials/modules/std/_std";
const Melon = {
    console: _console,
    std: _std,
    data: _data,
    guards: _guards,
    fs: _fs,
    http: _http,
    dotnet: _dotnet
};
globalThis.Melon = Melon;
