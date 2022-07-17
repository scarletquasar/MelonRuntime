<div align="center">
  <img align="center" width="225" src="https://i.imgur.com/guuToyf.png">
</div>

<br>

<div align="center">

  [![npm version](https://badgen.net/npm/v/melon-runtime/)](https://www.npmjs.com/package/melon-runtime)
  [![npm downloads](https://badgen.net/npm/dm/melon-runtime)](https://www.npmjs.com/package/melon-runtime)
  
</div>

<hr>

**Melon** is a declarative modern .NET JavaScript runtime.

<hr>

- [Changelog](https://github.com/MelonRuntime/MelonRuntime/blob/main/CHANGELOG.md)

<hr>

### 🚀 **Declarative-first programming**

Create, manage and scale applications and tools easily without having to think about everything.

<hr>

### ⚡ **.NET based environment** 

Portable, fast and powerful applications with all the features offered by the .NET environment via functions or interop.

<hr>

### 🧤 **Hands on development** 

Create a complete application in few lines with zero dependency.

<hr>

**Node.js**:

<details>

```js
const http = require("http");
const Todo = require("./controller");
const { getReqData } = require("./utils");

const PORT = process.env.PORT || 5000;

const server = http.createServer(async (req, res) => {
    if (req.url === "/api/todos" && req.method === "GET") {
        const todos = await new Todo().getTodos();e
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(todos));
    }

    else if (req.url.match(/\/api\/todos\/([0-9]+)/) && req.method === "GET") {
        try {
            const id = req.url.split("/")[3];
            const todo = await new Todo().getTodo(id);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(todo));
        } catch (error) {
            res.writeHead(404, { "Content-Type": "application/json" });

(...)
```

</details>


## Installation and usage:
> Tip: How to install ASP.NET 6 Runtime ([Windows](https://www.youtube.com/watch?v=AC5UWby16sg) | [Linux](https://www.youtube.com/watch?v=g0vuTh0Dao8))

- Install [Node](https://nodejs.org/en/) (Automatically generated projects require NPM to run)
- Install [ASP.NET 6.0 runtime](https://dotnet.microsoft.com/en-us/download/dotnet/6.0) if you haven't already
- Install the `melon-runtime` package globally using the command: `npm i melon-runtime@1.7.0 -g -f` or select a version from the table below:

| Version | Type |
| ------- | ---- |
| [1.7.0](https://www.npmjs.com/package/melon-runtime/v/1.7.0) | **Last Stable** |

## Generating and executing a project

- Go to a directory using `terminal` or inside your IDE and execute the command: `npx melon new`, a basic node.js-based file structure will be created
- Run `npm install` to install the required packages and start working with **TypeScript**
- Run `npm run go` to initialize the project

> Tip: A bundle file containing all installed NPM packages and your project will be created in `/dist/main.js`

## Core Contributors 

| [Victória Rose](https://github.com/EternalQuasar0206) | [Gabriel Grubba](https://github.com/Grubba27) | [Vinicius Lanzarini](https://github.com/vilanz) |
| -------------- | -------------- | -------------- |
| <div align="center"><img src="https://avatars.githubusercontent.com/u/70824102?v=4" width="60"></div> | <div align="center"><img src="https://avatars.githubusercontent.com/u/70247653?v=4" width="60"></div> | <div align="center"><img src="https://avatars.githubusercontent.com/u/29522926?v=4" width="60"></div> |

## Last Sponsors 

| [Lucas Rufo](https://github.com/LucasRufo) |
| -------------- |
| <div align="center"><img src="https://avatars.githubusercontent.com/u/60830097?v=4" width="60"></div> |