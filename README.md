# Melon [![npm version](https://badgen.net/npm/v/melon-runtime/)](https://www.npmjs.com/package/melon-runtime) [![npm downloads](https://badgen.net/npm/dm/melon-runtime)](https://www.npmjs.com/package/melon-runtime) [![license](https://badgen.net/github/license/MelonRuntime/Melon)](#)

**Melon** is a declarative modern .NET JavaScript runtime focused in rapid prototyping of projects, using minimal dependencies without breaking nothing.

📚 [Documentation](https://github.com/MelonRuntime/Melon/wiki) - ⏳ [Feature Coverage](./FEATURE_COVERAGE.md) - 💬 [Discord Server](https://discord.gg/wDJDT9Yq7C)

## Why Melon?

- Melon is based in [.NET](https://dotnet.microsoft.com/en-us/), a **cross-platform** open source framework for building powerful applications, this power is being extended to JavaScript and TypeScript projects with compatibility and interoperability by default.
- Melon is architected to work within the npm (node package manager) environment, this means you can install existing packages that are compatible with the runtime's built-in api. We are also working to make more and more packages compatible.
- Melon is designed to offer a quick solution for project prototyping, so that it offers the basics needed to create applications while offering scalability and maintainability when necessary.

## Web development

Melon brings the power of ASP.NET to JavaScript, allowing you to build synchronous or asynchronous dedicated web applications with few lines, using an express-like interface that is easy and simple to use.

```ts
const { http } = Melon;
const app = http.app();

app.get("/", async () => "Hello world");
app.run();

//App running in http://localhost:80
```

## Intensive async I/O operations

With the API of files and directories adapted to a JavaScript interface, it becomes simple to manage directories or files at the byte or text level in a simple and fast way, with just the use of simple methods without worrying about directly managing streams and cursors.

```ts
const { fs } = Melon;

async function createFileAndReadContent() {
  await fs.writeTextAsync("./hello.txt", "Hello world");
  const content = await fs.readTextAsync("./hello.txt");

  console.log(content);
}

createFileAndReadContent();

//"Hello world"
```

## Multithreading

Multithreaded parallel work can be done simply with Melon, the runtime uses an interface that creates a .NET "Thread" object and allows direct developer interaction via JavaScript, with automatic management by the internal CLR.

```ts
const { createThread } = Melon.dotnet.threading;
const { fs } = Melon;

const workerThread = createThread(() => {
  fs.writeText("./hello.txt", "Hello world");
  const content = fs.readText("./hello.txt");

  console.log(content);
});

workerThread.start();

//"Hello world"
```

## Direct .NET interop

It is possible to create a .NET instance manipulation object quickly using the Realm constructor, with it, there is the possibility to create instances with direct interoperability for use in code.

```ts
const { Realm } = Melon.dotnet;

const realm = new Realm();
realm.setInstance("randomInstance", "System:Random");
const randomInstance = realm.get("randomInstance");

console.log(randomInstance.next());

//1144300903
```