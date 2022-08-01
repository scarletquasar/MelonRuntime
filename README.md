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

- [Official Website](https://melonruntime.github.io/site/)
- [Installation](https://github.com/MelonRuntime/Melon#installation-and-usage)
- [Changelog](https://github.com/MelonRuntime/MelonRuntime/blob/main/CHANGELOG.md)
- [Internal Utilities](https://github.com/MelonRuntime/Melon/tree/main/utils)
- [Compatible Libraries](https://github.com/MelonRuntime/Melon/blob/main/LIBRARY_COMPATIBILITY.md)

<hr>

Portable, fast and powerful applications with all the features offered by the .NET environment via functions or interop.

```ts
const consoleWriteLine = dotnet.getStaticMethod("System:Console:WriteLine");
const { system } = std;

consoleWriteLine(system.osInformation())
```

<hr>

## Installation and usage

> ⛔ Melon requires ASP.NET Core 6 and Node.js installed.

```
npm i melon-runtime -g
```

To execute Melon, just type `npx melon [command]` in your terminal.

## Commands

- `npx melon run [script]` - Executes a script directly from the command line
- `npx melon load [path]` - Loads an external entry point
- `npx melon new [javascript|typescript]` - Creates a new empty Melon project in the current folder

### 🧤 **Hands-on development** 

Create a complete application in few lines with zero dependencies.

⚡ **Melon**:

| | | |
| - | - | - |
| ```ts
const app = http.app();

app.get("/", () => "Hello world");
app.run();

//App running in http://localhost:80
``` | | |

⛔ **Node.js**:

<details>

```js
const http = require("http");

const server = http.createServer(async (req, res) => {
    if (req.url === "/" && req.method === "GET") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end("Hello world");
    }
}

server.listen(80, () => {
    console.log(`server started on port: ${80}`);
});
```

</details>

⛔ **Deno**:

<details>

```ts
const listener = Deno.listen({ port: 80 });
console.log("http://localhost:80/");

for await (const conn of listener) {
  serve(conn);
}

async function serve(conn: Deno.Conn) {
  for await (const { respondWith } of Deno.serveHttp(conn)) {
    respondWith(new Response("Hello world"));
  }
}
```

</details>

<hr>

## Contributors 

| [Victória Rose](https://github.com/EternalQuasar0206) | [Gabriel Grubba](https://github.com/Grubba27) | [Vinicius Lanzarini](https://github.com/vilanz) |
| -------------- | -------------- | -------------- |
| <div align="center"><img src="https://avatars.githubusercontent.com/u/70824102?v=4" width="60"></div> | <div align="center"><img src="https://avatars.githubusercontent.com/u/70247653?v=4" width="60"></div> | <div align="center"><img src="https://avatars.githubusercontent.com/u/29522926?v=4" width="60"></div> |

## Latest Sponsors 

| [Lucas Rufo](https://github.com/LucasRufo) |
| -------------- |
| <div align="center"><img src="https://avatars.githubusercontent.com/u/60830097?v=4" width="60"></div> |
