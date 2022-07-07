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

# 📰 Running MelonRuntime on Docker

Currently, it is possible to run melon projects in docker, for this, the project must have a Dockerfile template
(customizable) that includes the ASP.NET 6.0 image and installs the latest NodeJS (which allows the execution of
NPM to perform of specific activities necessary for the execution).

- Using a pre-built MelonRuntime Docker API
- Clone the docker-api-melon repository
- Ensure that NodeJS and npm are installed and functional
- Ensure that docker is installed and running
- Execute the command npm run docker in the terminal repository root
- A new container will be created with the executing project
- The project may be running on http://localhost:3000