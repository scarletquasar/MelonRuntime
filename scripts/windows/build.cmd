:: dotnet build command focused in building the project on Windows
:: [requires .NET 6 SDK/Runtime or later]

@echo off

echo ######################
echo.
echo Building MelonJS...
echo.
echo ######################
echo.

dotnet build ..\..\projects\melon-runtime\ --configuration Release