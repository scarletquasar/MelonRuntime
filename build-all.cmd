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

cd "../.."
xcopy ".\projects\melon-core\dist\core.js" ".\projects\melon-runtime\Melon.Library\Bundle\core.js" /Y

:: Builds [melon-runtime]
cd "./projects/melon-runtime"
call npm run build