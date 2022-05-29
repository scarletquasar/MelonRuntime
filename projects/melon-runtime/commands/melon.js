#! /usr/bin/env node
import { execSync } from 'child_process'

code = execSync('dotnet run --configuration Release --project ../../../projects/melon-runtime/MelonJS/MelonJS.csproj')