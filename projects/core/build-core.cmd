:: [melon-core] building script
:: =========================
:: Warning: this will overwrite the packages '@babel/core',
:: '@babel/cli' and 'webpack-cli' globally.

@echo off

echo Melon Builder
echo =========================
echo Tip: Make sure that [npm] is installed in the current
echo device before running the builder.
echo =========================
echo:

call npm install @babel/cli @babel/core webpack-cli -g -f

mkdir output

call npm install -f
call npx babel --extensions .ts ./ --out-dir ./output/js-logic
call npx webpack ./output/js-logic/logic/index.js --config webpack.config.json

move ./dist ./output/final