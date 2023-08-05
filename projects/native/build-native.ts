import { cpSync } from "fs";
import { spawnSync } from "child_process"

/* 
:: [native] building Script
:: =========================
:: Warning: Needs a valid "core" build
*/

export const CHILD_SPAWN_OPTIONS: unknown = { 
    stdio: "inherit",
    shell: true
};

console.log("──────────────────────────────────────────────────────");
console.log("Melon Runtime Builder - Native ");  
console.log("──────────────────────────────────────────────────────");

console.log("──────────────────────────────────────────────────────");
console.log("Copying core bundle...");
console.log("──────────────────────────────────────────────────────");

cpSync(
    __dirname + "\\..\\core\\output\\final\\core.js", 
    __dirname + "\\MelonRuntime.Core\\Scripts\\core.js",
    { force: true }
);

console.log("──────────────────────────────────────────────────────");
console.log("Building .NET project...");
console.log("──────────────────────────────────────────────────────");

spawnSync("dotnet", [
    "publish", 
    "MelonRuntime.CLI",
    "-o", 
    "Output"
], CHILD_SPAWN_OPTIONS);

console.log("──────────────────────────────────────────────────────");
console.log("Done.");
console.log("──────────────────────────────────────────────────────");
