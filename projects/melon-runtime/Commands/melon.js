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

//Commands implementation
if(!process.argv.includes("--ignore-update")) {
    const integrityReal = await axios.get("https://raw.githubusercontent.com/MelonRuntime/Melon/development/projects/melon-runtime/integrity.txt")
    const integrityLocal = fs.readFileSync(__dirname.replace('Commands', 'integrity.txt')).toString();
    
    const shouldUpdate = Number(integrityReal) > Number(integrityLocal);

    if(shouldUpdate) {
        spawnSync(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', ['install', 'melon-runtime@^2.x.x', '-g']);
    }
    
    const instance = spawn(/^win/.test(process.platform) ? 'npx.cmd' : 'npx', ['melon', '--ignore-update', ...args], spawnOptions);
    instance.on('data', console.log);
}

if(process.argv.includes("--ignore-update")) {
    args = args.filter(x => !x.startsWith("--"));

    //Dotnet Melon implementation
    const outputDirectory = __dirname.replace('Commands', 'Output');
    const melon = spawn('dotnet', ["exec", path.join(outputDirectory, "Melon.dll"), ...args], spawnOptions);

    melon.on('data', console.log);
}