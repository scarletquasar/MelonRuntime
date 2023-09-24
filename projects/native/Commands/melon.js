#! /usr/bin/env node

import path from "path";
import { fileURLToPath } from "url";
import { spawn } from 'child_process';

const CHILD_SPAWN_OPTIONS = { stdio: "inherit" };
const ARGUMENTS = process.argv.slice(2);
const CURRENT_FILE = fileURLToPath(import.meta.url);
const CURRENT_DIRECTORY = path.dirname(CURRENT_FILE);
const MELON_ENTRY_POINT = "MelonRuntime.CLI.dll";
const MELON_OUTPUT_DIRECTORY = CURRENT_DIRECTORY.replace('Commands', 'Output');

async function initializeMelon() {
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