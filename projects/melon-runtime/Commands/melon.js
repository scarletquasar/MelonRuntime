#! /usr/bin/env node
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const args = process.argv.slice(2);

const outputDirectory = __dirname.replace('Commands', 'Output');
const spawnOptions = { stdio: "inherit" };

const melon = spawn('dotnet', ["exec", path.join(outputDirectory, "Melon.dll"), ...args], spawnOptions);

melon.on('data', console.log);