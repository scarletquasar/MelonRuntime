// Utilitary imports
import { setupEnvironmentVariables } from "logic/runtime/global-environment-core";
import { addPrototypeExtension } from "./runtime/injections-core";
import { and } from "logic/runtime/global-extensions";

// Isolated imports
import { _Version } from "./api/constructors/_Version"

// Module imports
import { console as _console } from "logic/api/modules/console/console"
import { dotnet } from "./api/modules/dotnet/dotnet"
import { _crypto } from "./api/statics/_Crypto"
import { _fs } from "./api/modules/fs/fs"
import { _guards } from "./api/modules/guards/_guards"
import { http } from "./api/modules/http/http"
import { _std } from "./api/modules/std/_std"
import { _data } from "./api/modules/data/_data"
import { testing } from "./api/modules/testing/testing"
import { runtime } from "./api/modules/runtime/runtime"

setupEnvironmentVariables();
addPrototypeExtension(Object, "and", and);

const Melon = {
    console: _console,
    testing,
    std: _std,
    data: _data,
    guards: _guards,
    fs: _fs,
    http,
    dotnet,
    crypto: _crypto,
    runtime,
    Version: _Version
}

globalThis["Melon"] = Melon;

export { Melon }