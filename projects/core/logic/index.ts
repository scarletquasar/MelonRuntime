// Utilitary imports
import { setupEnvironmentVariables } from "logic/runtime/global-environment-core"
import { $ } from "./partials/utils/generic/$"
import { addPrototypeExtension } from "./partials/utils/generic/addPrototypeExtension"

// Isolated imports
import { _Version } from "./partials/constructors/_Version"

// Module imports
import { console as _console } from "logic/partials/modules/console/console"
import { dotnet } from "./partials/modules/dotnet/dotnet"
import { _crypto } from "./partials/statics/_Crypto"
import { _fs } from "./partials/modules/fs/fs"
import { _guards } from "./partials/modules/guards/_guards"
import { http } from "./partials/modules/http/http"
import { _std } from "./partials/modules/std/_std"
import { _data } from "./partials/modules/data/_data"
import { testing } from "./partials/modules/testing/testing"
import { runtime } from "./partials/modules/runtime/runtime"

setupEnvironmentVariables();
addPrototypeExtension(Object, "$", $);

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