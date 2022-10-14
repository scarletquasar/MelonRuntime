:: Melon [build-all] command
:: ============================================
:: Builds [melon-core] bundle and automatically
:: implements the file in the [melon-runtime]
:: project. After that, builds the project using
:: internal dotnet publish command.

:: Builds [melon-core] and copy the bundle to 
:: [melon-runtime]
cd "./projects/melon-core"
call npm run build

copy "./dist/core.js" "../melon-runtime/Melon.Library/Bundle/core.js"

:: Builds [melon-runtime]
cd "../melon-runtime"
call npm run build