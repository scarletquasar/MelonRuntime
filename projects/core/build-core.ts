import { spawnSync } from "child_process"
import { mkdirSync, cpSync, rmSync, existsSync } from "fs"

/* 
:: [core] building Script
:: =========================
:: Warning: "-i" will overwrite the packages '@babel/core',
:: '@babel/cli' and 'webpack-cli' globally.
*/

const CHILD_SPAWN_OPTIONS: unknown = { 
    stdio: "inherit",
    shell: true
};

const GLOBAL_INSTALLS = [
    "@babel/cli",
    "@babel/core", 
    "webpack-cli"
];

const args = process.argv;
const forceGlobalInstalls = args.includes(" -i ");
const keepCache = args.includes(" -kc ");

console.log("──────────────────────────────────────────────────────");
console.log("Melon Runtime Builder - Core Packages");  
console.log("──────────────────────────────────────────────────────");

if (forceGlobalInstalls) {
    console.log("──────────────────────────────────────────────────────");
    console.log("Installing Global Dependencies");
    console.log("──────────────────────────────────────────────────────");

    spawnSync("npm", [
        "install", 
        ...GLOBAL_INSTALLS,
        "-g", 
        "-f"
    ], CHILD_SPAWN_OPTIONS);
}

if (!keepCache) {
    console.log("──────────────────────────────────────────────────────");
    console.log("Cleaning the previous build...");  
    console.log("──────────────────────────────────────────────────────");
    
    if (existsSync(__dirname + "\\output")) {
        rmSync(__dirname + "\\output", { recursive: true, force: true });
    }
}

console.log("──────────────────────────────────────────────────────");
console.log("Installing Local Dependencies...");  
console.log("──────────────────────────────────────────────────────");

mkdirSync("output");

spawnSync("npm", [
    "install",
    "-f"
], CHILD_SPAWN_OPTIONS);

console.log("──────────────────────────────────────────────────────");
console.log("Executing transpiler (TypeScript >> JavaScript)...");  
console.log("──────────────────────────────────────────────────────");

spawnSync("echo", ["a"])
spawnSync("npx", [
    "babel",
    "--extensions",
    ".ts",
    __dirname + "\\",
    "--out-dir",
    __dirname + "\\output\\js-logic"
], CHILD_SPAWN_OPTIONS);

console.log("──────────────────────────────────────────────────────");
console.log("Executing bundler (JavaScript >> Core bundle)...");  
console.log("──────────────────────────────────────────────────────");

spawnSync("npx", [
    "webpack",
    __dirname + "\\output\\js-logic\\logic\\index.js",
    "--config webpack.config.json"
], CHILD_SPAWN_OPTIONS);

console.log("──────────────────────────────────────────────────────");
console.log("Copying output files...");  
console.log("──────────────────────────────────────────────────────");

cpSync(__dirname + "\\output\\dist", __dirname + "\\output\\final");
rmSync(__dirname + "\\dist", { recursive: true, force: true });

console.log("──────────────────────────────────────────────────────");
console.log("Done.");  
console.log("──────────────────────────────────────────────────────");
