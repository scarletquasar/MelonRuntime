:: dotnet build command focused in building the project on Windows
:: [requires .NET 6 SDK/Runtime or later]

@echo off

echo ######################
echo.
echo Building MelonJS...
echo.
echo ######################
echo.

cd .\projects\melon-runtime\
dotnet build --configuration Release