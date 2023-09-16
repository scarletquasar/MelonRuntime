import { interopCache } from "logic/runtime/interop-cache-core";
import { Result } from "./functional-core";

function getArgs() {
    return interopCache.environment.getCommandLineArgs();
}

function getCurrentDir() {
    return interopCache.environment.currentDirectory;
}

function getEnvVar(key: string): Result<Error, string>  {
    if (key === null) {
        return Result.left(new Error("The provided key name can't be null"));
    }

    const result = interopCache.environment.getEnvironmentVariable(key);

    if (result === null) {
        return Result.left(new Error("No value found for the provided key."));
    }

    return Result.right(result);
}

function getEnvVars(): Record<string, string> {
    return interopCache.environment.getEnvironmentVariables();
}

function setEnvVar(key: string, value: string | number | boolean | bigint) {
    const finalValue = value.toString();
    interopCache.environment.setEnvironmentVariable(key, finalValue);
}

export { getArgs, getCurrentDir, getEnvVar, getEnvVars, setEnvVar }