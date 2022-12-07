#! /usr/bin/env node

import axios from "axios";
import path from "path";
import fs from "fs";

import { fileURLToPath } from "url";
import { spawn, spawnSync } from 'child_process';

const CHILD_SPAWN_OPTIONS = { stdio: "inherit" };
const ARGUMENTS = process.argv.slice(2);
const CURRENT_FILE = fileURLToPath(import.meta.url);
const CURRENT_DIRECTORY = path.dirname(CURRENT_FILE);
const MELON_ENTRY_POINT = "MelonRuntime.CLI.dll";
const MELON_OUTPUT_DIRECTORY = CURRENT_DIRECTORY.replace('Commands', 'Output');

const INTEGRITY_PATH = "https://raw.githubusercontent.com/MelonRuntime/Melon/main/projects/melon-runtime/integrity.txt";
const CURRENT_INTEGRITY_PATH = CURRENT_DIRECTORY.replace('Commands', 'integrity.txt');

const enableUpdateChecking = process.argv.filter(x => x.startsWith("--")).length > 0;
const npmIdentifier = /^win/.test(process.platform) ? "npm.cmd" : "npm";
const npxIdentifier = /^win/.test(process.platform) ? "npx.cmd" : "npx";

const melonUpdatePattern = ['install', 'melon-runtime@^2.x.x', '-g'];
const melonExecutePattern = ['melon', '--ignore-update'];

async function initializeMelon(checkForUpdates) {
    if(checkForUpdates) {
        try {
            const integrity = await axios.get(INTEGRITY_PATH);
            const realState = integrity.data;
    
            const currentIntegrity =  fs.readFileSync(CURRENT_INTEGRITY_PATH);
            const currentState = currentIntegrity.toString();
    
            const updateRequired = Number(realState) > Number(currentState);
            updateRequired ? spawnSync(npmIdentifier, melonUpdatePattern) : {};
    
            const wrapper = spawn(npxIdentifier, [...melonExecutePattern, ...args], CHILD_SPAWN_OPTIONS);
            wrapper.on("data", console.log);
        }
        catch(e) {}
    }

    const filteredArgs = ARGUMENTS.filter(x => x != "--ignore-update");

    const melon = spawn(
        'dotnet', 
        [
            "exec", 
            path.join(MELON_OUTPUT_DIRECTORY, MELON_ENTRY_POINT), ...filteredArgs
        ], 
        CHILD_SPAWN_OPTIONS
    );

    melon.on('data', console.log);
}

await initializeMelon(enableUpdateChecking);