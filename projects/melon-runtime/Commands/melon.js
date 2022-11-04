#! /usr/bin/env node
import { fileURLToPath } from 'url';
import { spawn, spawnSync } from 'child_process';
import path from 'path';

const spawnOptions = { stdio: "inherit" };
let args = process.argv.slice(2);

//Commands implementation
if(!process.argv.includes("--ignore-update")) {
    spawnSync(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', ['install', 'melon-runtime@^2.x.x', '-g']);
    
    const instance = spawn(/^win/.test(process.platform) ? 'npx.cmd' : 'npx', ['--ignore-update', 'melon', ...args], spawnOptions);
    instance.on('data', console.log);
}

if(process.argv.includes("--ignore-update")) {
    args = args.filter(x => !x.startsWith("--"));

    //Dotnet Melon implementation
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const outputDirectory = __dirname.replace('Commands', 'Output');
    const melon = spawn('dotnet', ["exec", path.join(outputDirectory, "Melon.dll"), ...args], spawnOptions);

    melon.on('data', console.log);
}