# Melon [![npm version](https://badgen.net/npm/v/melon-runtime/)](https://www.npmjs.com/package/melon-runtime) [![npm downloads](https://badgen.net/npm/dm/melon-runtime)](https://www.npmjs.com/package/melon-runtime) [![license](https://badgen.net/github/license/MelonRuntime/Melon)](#)

**Melon** is a declarative modern .NET JavaScript runtime focused in rapid prototyping of projects, with minimal dependencies without breaking nothing.

📚 [Documentation](https://github.com/MelonRuntime/Melon/wiki) - ⏳ [Feature Coverage](./FEATURE_COVERAGE.md) - 💬 [Discord Server](https://discord.gg/wDJDT9Yq7C)

## Why Melon?

- Melon is based in [.NET](https://dotnet.microsoft.com/en-us/), a **cross-platform** open source framework for building powerful applications, this power is being extended to JavaScript and TypeScript projects with compatibility and interoperability by default.
- Melon is architected to work within the npm (node package manager) environment, this means you can install existing packages that are compatible with the runtime's built-in api. We are also working to make more and more packages compatible.
- Melon is designed to offer a quick solution for project prototyping, so that it offers the basics needed to create applications while offering scalability and maintainability when necessary.

## **Built-in web development** 

Melon brings the power of ASP.NET to JavaScript, allowing you to build synchronous or asynchronous dedicated web applications with few lines, using an express-like interface that is easy and simple to use.

```ts
const { http } = Melon;
const app = http.app();

app.get("/", async () => "Hello world");
app.run();

//App running in http://localhost:80
```