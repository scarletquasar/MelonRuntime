import { interopCache } from "logic/runtime/interop-cache-core";
import { Result } from "./functional-core";

function getArgs(): Result<Error, string[]> {
    return Result.right(interopCache.environment.getCommandLineArgs());
}

function getCurrentDir(): Result<Error, string> {
    return Result.right(interopCache.environment.currentDirectory);
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

function getEnvVars(): Result<Error, Record<string, string>> {
    return Result.right(interopCache.environment.getEnvironmentVariables());
}

function setEnvVar(key: string, value: string | number | boolean | bigint) {
    const finalValue = value.toString();
    return Result.right(interopCache.environment.setEnvironmentVariable(key, finalValue));
}

export { getArgs, getCurrentDir, getEnvVar, getEnvVars, setEnvVar }