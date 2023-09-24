// Utilitary imports
import { setupEnvironmentVariables } from "logic/runtime/global-environment-core";

// Module imports
import { stdio } from "logic/api/modules/stdio/stdio"
import { interop } from "./api/modules/interop/interop"
import { server } from "./api/modules/server/server-basic-core";
import { stdlib } from "./api/modules/stdlib/stdlib"

setupEnvironmentVariables();

globalThis.stdio = stdio;
globalThis.stdlib = stdlib;
globalThis.interop = interop;
globalThis.server = server;

// Ready to use state!