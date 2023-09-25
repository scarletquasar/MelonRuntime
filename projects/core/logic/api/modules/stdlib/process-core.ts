import { interopCache } from "logic/runtime/interop-cache-core";
import { Result } from "./functional-core";

function exit(exitCode = 0): Result<Error, never> {
    interopCache.process.exit(exitCode);
    return Result.left(new Error("Failed to finish the current process")) as Result<Error, never>;
}

function getPid(): number {
    return interopCache.process.getCurrentProcess().id;
}

export { exit, getPid }