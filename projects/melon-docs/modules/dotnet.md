<div align="center">
  <img align="center" width="225" src="https://i.imgur.com/guuToyf.png">
</div>

<br>

<div id="no-view" align="center">

  [![npm version](https://badgen.net/npm/v/melon-runtime/)](https://www.npmjs.com/package/melon-runtime)
  [![npm downloads](https://badgen.net/npm/dm/melon-runtime)](https://www.npmjs.com/package/melon-runtime)

  [Getting Started](../Index.md) - [Melon Commands](./MelonCommands.md) - dotnet - [std](./modules/std.md) - [console](./modules/consle.md) - [console](./modules/consle.md) - [fs](./modules/fs.md) - [guards](./modules/guards.md) - [http](./modules/http.md) - [data](./modules/data.md) - [Async Constructors](./modules/AsyncConstructors.md) - [Generic Constructors](./modules/GenericConstructors.md)
  
</div>

<hr>

`dotnet` module reference for Melon.

<hr>

## getStaticMethod (Method)

Returns a .NET internal static method using an expression with the template: `[Namespace:Type:Method]`. Can be used to call any static method that is currently loaded by the internal program, including ALL built-in ones (from the framework) and/or related to [CLI.NET](https://github.com/victoriaquasar/Cli.NET).

**⚡ Usage (JavaScript):**

```js
getStaticMethod("Namespace:Type:Method");
```

```js
const { getStaticMethod } = dotnet;
const writeLine = getStaticMethod("System:Console:WriteLine");

writeLine("Hello World!"); //Hello World!
```

**⚡ Usage (TypeScript):**

```ts
getStaticMethod<TReturn>("Namespace:Type:Method");
```

> **Note** (Usage)
>
> `TReturn` is the return type of the obtained method, use `void` if there is no return.

```ts
const { getStaticMethod } = dotnet;
const writeLine = getStaticMethod<void>("System:Console:WriteLine");

writeLine("Hello World!"); //Hello World!
```

