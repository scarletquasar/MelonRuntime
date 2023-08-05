import { readText } from "logic/api/modules/fs/fs-raw-file-management";
import { _setEnvironmentVariable } from "logic/api/modules/std/environment/_setEnvironmentVariable";
import { interopCache } from "logic/runtime/interop-cache-core";
import { _guards } from "logic/api/modules/guards/_guards";
import { Primitive } from "types/internal/generic-types";

function setupEnvironmentVariables() {
    if(interopCache.io.getFiles("./", "*.env").length === 0) {
        return;
    }
        
    const content = readText("./.env");

    if(!_guards.string.isNullOrWhiteSpace(content)) {
        const envObject = keyValueParse<Record<string, Primitive>>(content);
    
        Object
            .entries(envObject)
            .forEach(item => _setEnvironmentVariable(item[0], item[1]));
    }
}

function keyValueParse<T>(content: string) {
    const entries = content
        .split("\n")
        .map(line => line.trim())
        .filter(line => !line.startsWith("#"))
        .map(line => line.split("="))
        .filter(entry => entry.length === 2)
        .filter(entry => Boolean(entry[0]) && Boolean(entry[1]));

    return Object.fromEntries(entries) as T;
}

export { setupEnvironmentVariables }