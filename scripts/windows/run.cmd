:: dotnet run command focused in running the project on Windows
:: and executing the passed commands
:: [requires .NET 6 SDK/Runtime or later]
:: Argument[*]: commands

@echo off

echo ######################
echo.
echo Building and executing MelonJS...
echo Args [%*]
echo.
echo ######################
echo.

cd .\projects\melon-runtime\
dotnet run --project ..\..\projects\melon-runtime\MelonJS\MelonJS.csproj %*