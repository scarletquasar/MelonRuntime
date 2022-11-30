#! /usr/bin/env node
import { fileURLToPath } from 'url';
import { spawn, spawnSync } from 'child_process';
import path from 'path';
import axios from "axios";
import fs from "fs";

const spawnOptions = { stdio: "inherit" };
let args = process.argv.slice(2);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const shouldCheckForUpdates = process.argv.filter(x => x.startsWith("--")).length > 0;

//Commands implementation
if(!shouldCheckForUpdates) {
    const integrityRealResponse = await axios.get("https://raw.githubusercontent.com/MelonRuntime/Melon/main/projects/melon-runtime/integrity.txt")
    const integrityReal = integrityRealResponse.data;
    const integrityLocal = fs.readFileSync(__dirname.replace('Commands', 'integrity.txt')).toString();
    
    const shouldUpdate = Number(integrityReal) > Number(integrityLocal);

    if(shouldUpdate) {
        spawnSync(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', ['install', 'melon-runtime@^2.x.x', '-g']);
    }
    
    const instance = spawn(/^win/.test(process.platform) ? 'npx.cmd' : 'npx', ['melon', '--ignore-update', ...args], spawnOptions);
    instance.on('data', console.log);
}

if(shouldCheckForUpdates) {
    args = args.filter(x => x != "--ignore-update");

    //Dotnet Melon implementation
    const outputDirectory = __dirname.replace('Commands', 'Output');
    const melon = spawn('dotnet', ["exec", path.join(outputDirectory, "MelonRuntime.CLI.dll"), ...args], spawnOptions);

    melon.on('data', console.log);
}