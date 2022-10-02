# Melon [![npm version](https://badgen.net/npm/v/melon-runtime/)](https://www.npmjs.com/package/melon-runtime) [![npm downloads](https://badgen.net/npm/dm/melon-runtime)](https://www.npmjs.com/package/melon-runtime) [![license](https://badgen.net/github/license/MelonRuntime/Melon)](#)


<hr>

**Melon** is a declarative modern .NET JavaScript runtime.

<hr>

- [Documentation](https://github.com/MelonRuntime/Melon/wiki)
- [Feature Coverage](./FEATURE_COVERAGE.md)
- [Discord Server](https://discord.gg/wDJDT9Yq7C)

<hr>

Portable, fast and powerful applications with all the features offered by the .NET environment via functions or interop.

```ts
const { getStaticMethod } = Melon.dotnet;
const writeLine = getStaticMethod<void>("System:Console:WriteLine");

writeLine("Hello World!");
```

<hr>

### **Hands-on development** 

Create a complete application in few lines with zero dependencies.

```ts
const { http } = Melon;
const app = http.app();

app.get("/", async () => "Hello world");
app.run();

//App running in http://localhost:80
```