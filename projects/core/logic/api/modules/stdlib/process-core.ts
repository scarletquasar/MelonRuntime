import { interopCache } from "logic/runtime/interop-cache-core";

function exit(exitCode: number) {
    interopCache.process.exit(exitCode);
}

function getPid(): number {
    return interopCache.process.getCurrentProcess().id;
}

export { exit, getPid }