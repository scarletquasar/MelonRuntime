# 🧵 Executing standalone scripts

Inline commands can be executed directly via command in MelonRuntime quickly and simply:

```bash
npx melon run "command"
```

# 📜 Loading standalone script files

Standalone *.js can also be executed directly via command line:

```bash
npx melon exec [path]
```

# 🔗 Generating and loading projects

Inline commands can be executed directly via command in MelonRuntime quickly and simply:

- Go to a directory using terminal or inside your IDE
- Run `npx melon new`, and a basic node.js-based file structure will be created
- Run `npm install` to install the required melon types and start working with TypeScript
- Run `npm run go` to initialize the project

```
🎯 Tip: A bundle file containing all installed NPM packages and your project will be created in /dist/main.js
```
```
🎯 Tip: If you experience issues with webpack, try executing the command npm i webpack-cli -g
```