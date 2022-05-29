#! /usr/bin/env node
import { spawn } from 'child_process'

const args = process.argv.slice(2).join(" ")
const melon = spawn('dotnet', ['run', '--configuration', 'Release', '--project', './MelonJS/MelonJS.csproj', ...args])

melon.stdout.on('data', function (data) {
    console.log(data.toString());
});
  
melon.stderr.on('data', function (data) {
    console.log(data.toString());
});

melon.on('exit', function (code) {
    console.log('MelonJS exited with code ' + code.toString());
});