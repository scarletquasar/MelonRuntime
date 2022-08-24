<div align="center">
  <img align="center" width="225" src="https://i.imgur.com/guuToyf.png">
</div>

<br>

<div id="no-view" align="center">

  [![npm version](https://badgen.net/npm/v/melon-runtime/)](https://www.npmjs.com/package/melon-runtime)
  [![npm downloads](https://badgen.net/npm/dm/melon-runtime)](https://www.npmjs.com/package/melon-runtime)

  [Getting Started](../Index.md) - [Melon Commands](./MelonCommands.md) - dotnet - [std](./std.md) - [console](./consle.md) - [console](./consle.md) - [fs](./fs.md) - [guards](./guards.md) - [http](./http.md) - [data](./data.md) - [Async Constructors](./AsyncConstructors.md) - [Generic Constructors](./GenericConstructors.md)
  
</div>

<hr>

`dotnet` module reference for Melon.

<hr>

### Summary

- [getStaticMethod (Method)](#getstaticmethod-method)
- [getStaticProperty (Method)](#getstaticproperty-method)
- [loadAssembly (Method)](#loadassembly-method)

<hr>

## getStaticMethod (Method)

Returns a static .NET method using an expression with the template: `[Namespace:Type:Method]`. Can be used to call any static method that is currently loaded by the internal program, including ALL built-in ones (from the framework) and/or related to [CLI.NET](https://github.com/victoriaquasar/Cli.NET).

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

```ts
const { getStaticMethod } = dotnet;
const writeLine = getStaticMethod<void>("System:Console:WriteLine");

writeLine("Hello World!"); //Hello World!
```

> **Note** (Usage)
>
> `TReturn` is the return type of the obtained method, use `void` if there is no return.

> **Note** (Development)
>
> You can get the `melon-types` typing source for this method [here](../../melon-types/dotnet.d.ts#L7) and the method core source [here](../../melon-runtime/Melon.Library/Dotnet/dotnet.js#L2).

## getStaticProperty (Method)

Returns a static .NET property using an expression with the template: `[Namespace:Type:Property]`. Can be used to call any static property that is currently loaded by the internal program.

**⚡ Usage (JavaScript):**

```js
getStaticProperty("Namespace:Type:Property");
```

```js
const { getStaticProperty } = dotnet;
const title = getStaticField("System:Console:Title");
```

**⚡ Usage (TypeScript):**

```ts
getStaticProperty<TProperty>("Namespace:Type:Method");
```

```ts
const { getStaticProperty } = dotnet;
const title = getStaticProperty<string>("System:Console:Title");
```

> **Note** (Usage)
>
> `TProperty` is the TypeScript equivalent type of the desired property.

> **Note** (Development)
>
> You can get the `melon-types` typing source for this method [here](../../melon-types/dotnet.d.ts#L8) and the method core source [here](../../melon-runtime/Melon.Library/Dotnet/dotnet.js#L16).

## loadAssembly (Method)

Loads an external assembly by passing the target path as argument and returns the assembly name (string). Note: can only load valid .NET assemblies (.dll files).

**⚡ Usage (JavaScript/TypeScript):**

```js
loadAssembly("/Path/To/Assembly.dll");
```

```js
const { loadAssembly } = dotnet;
const assemblyName: string = loadAssembly("./MyAssembly.dll");
```

> **Warning**
>
> This is an experimental method and may not work as intended. More development time is
> required to grant stability.

> **Note** (Development)
>
> You can get the `melon-types` typing source for this method [here](../../melon-types/dotnet.d.ts#L9) and the method core source [here](../../melon-runtime/Melon.Library/Dotnet/dotnet.js#L27).

[Back to top](#)