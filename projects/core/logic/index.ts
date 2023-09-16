// Utilitary imports
import { setupEnvironmentVariables } from "logic/runtime/global-environment-core";
import { addPrototypeExtension } from "./runtime/injections-core";
import { and } from "logic/runtime/global-extensions";

// Module imports
import { stdio } from "logic/api/modules/stdio/stdio"
import { dotnet } from "./api/modules/dotnet/dotnet"
import { _crypto } from "./api/statics/_Crypto"
import { _fs } from "./api/modules/fs/fs"
import { _guards } from "./api/modules/guards/_guards"
import { http } from "./api/modules/http/http"
import { stdlib } from "./api/modules/stdlib/stdlib"
import { _data } from "./api/modules/data/_data"
import { runtime } from "./api/modules/runtime/runtime"

setupEnvironmentVariables();
addPrototypeExtension(Object, "and", and);

const Melon = {
    stdio,
    stdlib,
    data: _data,
    guards: _guards,
    fs: _fs,
    http,
    dotnet,
    crypto: _crypto,
    runtime
}

globalThis["Melon"] = Melon;

export { Melon }