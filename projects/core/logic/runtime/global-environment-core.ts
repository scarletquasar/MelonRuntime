import { stdio } from "logic/api/modules/stdio/stdio";
import { setEnvVar } from "logic/api/modules/stdlib/environment-core";
import { interopCache } from "logic/runtime/interop-cache-core";
import { Primitive } from "types/internal/generic-types";

function setupEnvironmentVariables() {
    if(interopCache.io.getFiles("./", "*.env").length === 0) {
        return;
    }
        
    const content = stdio.storage.readText("./.env");

    if(content != null && content != "") {
        const envObject = keyValueParse<Record<string, Primitive>>(content);
    
        Object
            .entries(envObject)
            .forEach(item => setEnvVar(item[0], item[1].toString()));
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