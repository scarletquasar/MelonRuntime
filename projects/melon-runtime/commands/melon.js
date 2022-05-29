#! /usr/bin/env node
import { spawn } from 'child_process'

const args = process.argv.slice(1).join("")
console.log(args)

const melon = spawn('dotnet', ['run', '--configuration', 'Release', '--project', './MelonJS/MelonJS.csproj', ...args])

melon.stdout.on('data', function (data) {
    console.log('stdout: ' + data.toString());
});
  
melon.stderr.on('data', function (data) {
    console.log('stderr: ' + data.toString());
});

melon.on('exit', function (code) {
    console.log('child process exited with code ' + code.toString());
});