#! /usr/bin/env node
import { spawn } from 'child_process'
import { fileURLToPath } from 'url'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const args = process.argv.slice(2).join(" ")

console.log("Executing MelonJS with args: " + args)

const melon = spawn('dotnet', ['run', '--configuration', 'Release', '--project', 
__dirname.replace('commands', '/MelonJS/MelonJS.csproj'), ...args])

melon.stdout.on('data', function (data) {
    console.log(data.toString())
})
  
melon.stderr.on('data', function (data) {
    console.log(data.toString())
})

melon.on('exit', function (code) {
    console.log('MelonJS exited with code ' + code.toString())
})