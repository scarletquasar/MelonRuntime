// Utilitary imports
import { setupEnvironmentVariables } from "logic/runtime/global-environment-core";
import { addPrototypeExtension } from "./runtime/injections-core";
import { and } from "logic/runtime/global-extensions";

// Module imports
import { stdio } from "logic/api/modules/stdio/stdio"
import { interop } from "./api/modules/interop/interop"
import { rawfs } from "./api/modules/rawfs/rawfs-core"
import { server } from "./api/modules/server/server-basic-core";
import { stdlib } from "./api/modules/stdlib/stdlib"

setupEnvironmentVariables();
addPrototypeExtension(Object, "and", and);

const Melon = {
    stdio,
    stdlib,
    rawfs,
    server,
    interop
}

globalThis["Melon"] = Melon;

export { Melon }