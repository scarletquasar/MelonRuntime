#! /usr/bin/env node
const execSync = require('child_process').execSync

code = execSync('dotnet run --configuration Release --project ../../../projects/melon-runtime/MelonJS/MelonJS.csproj')