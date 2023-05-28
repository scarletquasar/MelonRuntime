#! /usr/bin/env node

import axios from "axios";
import path from "path";
import fs from "fs";
import semver from "semver";

import { fileURLToPath } from "url";
import { spawn } from 'child_process';

const CHILD_SPAWN_OPTIONS = { stdio: "inherit" };
const ARGUMENTS = process.argv.slice(2);
const CURRENT_FILE = fileURLToPath(import.meta.url);
const CURRENT_DIRECTORY = path.dirname(CURRENT_FILE);
const MELON_ENTRY_POINT = "MelonRuntime.CLI.dll";
const MELON_OUTPUT_DIRECTORY = CURRENT_DIRECTORY.replace('Commands', 'Output');

const PACKAGE_PATH = "https://raw.githubusercontent.com/MelonRuntime/Melon/main/projects/melon-runtime/package.json";
const CURRENT_PACKAGE_PATH = CURRENT_DIRECTORY.replace('Commands', 'package.json');

const enableUpdateChecking = process.argv.filter(x => x.startsWith("--")).length > 0;

async function initializeMelon(checkForUpdates) {
    if(checkForUpdates) {
        try {
            const packageContent = await axios.get(PACKAGE_PATH);
            const realPackageVersion = packageContent.data.version;
    
            const currentPackageContent = JSON.parse(fs.readFileSync(CURRENT_PACKAGE_PATH));
            const currentPackageVersion = currentPackageContent.version;
    
            const updateAvailable = semver.gte(realPackageVersion, currentPackageVersion);

            if (updateAvailable) {
                console.log("╭───────────────────────────────────────────────────────╮");
                console.log("│ New Melon Runtime update available!                   │");             
                console.log(`│ ${currentPackageVersion} >>> ${realPackageVersion}    │`);
                console.log("│ Use npm i melon-runtime -g to update.                 │");
                console.log("╰───────────────────────────────────────────────────────╯");
            }
        }
        catch(e) {
            console.error("╭───────────────────────────────────────────────────────╮");
            console.error("│ Error checking updates. Check the device connection   │");             
            console.error("╰───────────────────────────────────────────────────────╯");
        }
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