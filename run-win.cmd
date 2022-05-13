:: dotnet run command focused in running the project on Windows
:: and executing the command "run console.log('Hello Melon!')"
:: [requires .NET 6 SDK/Runtime or later]

@echo off

echo [Building and executing MelonJS...]
echo.
dotnet run --project MelonJS/MelonJS.csproj "run console.log('Hello Melon!')"