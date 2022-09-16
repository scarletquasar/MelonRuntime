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

- [Documentation](https://github.com/MelonRuntime/Melon/wiki)

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

<hr>

## Contributors 

| [Victória Rose](https://github.com/EternalQuasar0206) | [Gabriel Grubba](https://github.com/Grubba27) | [Vinicius Lanzarini](https://github.com/vilanz) |
| -------------- | -------------- | -------------- |
| <div align="center"><img src="https://avatars.githubusercontent.com/u/70824102?v=4" width="60"></div> | <div align="center"><img src="https://avatars.githubusercontent.com/u/70247653?v=4" width="60"></div> | <div align="center"><img src="https://avatars.githubusercontent.com/u/29522926?v=4" width="60"></div> |

## Latest Sponsors 

| [Lucas Rufo](https://github.com/LucasRufo) |
| -------------- |
| <div align="center"><img src="https://avatars.githubusercontent.com/u/60830097?v=4" width="60"></div> |
