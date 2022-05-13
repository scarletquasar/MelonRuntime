:: Direct installation script for Windows
:: [requires .NET 6 SDK/Runtime or later]
:: [requires admin powers to be executed]
:: Argument[0]: installation path

@echo off

echo [Installing MelonJS (command: melon)...]

dotnet build --configuration Release -o %*\MelonRuntime\

if exist "c:\Windows\System32\melon.cmd" del /F "c:\Windows\System32\melon.cmd"

echo @echo off >> "c:\Windows\System32\melon.cmd"
echo %*\MelonRuntime\MelonJS.exe %%*>> "c:\Windows\System32\melon.cmd"