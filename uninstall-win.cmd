:: Direct uninstallation script for Windows
:: [requires admin powers to be executed]
:: Argument[0]: current installation path

@echo off

echo [Uninstalling MelonJS...]

del /F /Q %*\MelonRuntime\*.* 
rmdir /s /q %*\MelonRuntime\

if exist "c:\Windows\System32\melon.cmd" del /F "c:\Windows\System32\melon.cmd"

echo [MelonJS uninstalled]