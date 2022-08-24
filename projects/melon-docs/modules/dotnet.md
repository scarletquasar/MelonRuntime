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
- [removeAssembly (Method)](#removeassembly-method)
- [getLoadedAssemblies (Method)](#getloadedassemblies-method)
- [types (Submodule)](#types-submodule)
  - [sbyte (Method)](#sbyte-method)
  - [byte (Method)](#byte-method)
  - [short (Method)](#short-method)
  - [ushort (Method)](#ushort-method)
  - [int (Method)](#int-method)
  - [uint (Method)](#uint-method)
  - [long (Method)](#long-method)
  - [ulong (Method)](#ulong-method)
  - [float (Method)](#float-method)
  - [double (Method)](#double-method)
  - [decimal (Method)](#decimal-method)

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

## removeAssembly (Method)

Loads an external assembly by passing the target path as argument and returns the assembly name (string). Note: can only load valid .NET assemblies (.dll files).

**⚡ Usage (JavaScript/TypeScript):**

```js
removeAssembly("Assembly Name");
```

```js
const { removeAssembly } = dotnet;
removeAssembly("MyAssembly");
```

> **Warning**
>
> This is an experimental method and may not work as intended. More development time is
> required to grant stability.

> **Note** (Development)
>
> You can get the `melon-types` typing source for this method [here](../../melon-types/dotnet.d.ts#L10) and the method core source [here](../../melon-runtime/Melon.Library/Dotnet/dotnet.js#L28).

## getLoadedAssemblies (Method)

Returns a list of the loaded assembly names, the values can be `string` or `null`.

**⚡ Usage (JavaScript/TypeScript):**

```js
const loadedAssemblies = getLoadedAssemblies();
```

```js
const { getLoadedAssemblies } = dotnet;
const loadedAssemblies = getLoadedAssemblies();
```

> **Warning**
>
> This is an experimental method and may not work as intended. More development time is
> required to grant stability.

> **Note** (Development)
>
> You can get the `melon-types` typing source for this method [here](../../melon-types/dotnet.d.ts#L11) and the method core source [here](../../melon-runtime/Melon.Library/Dotnet/dotnet.js#L29).

## types (Submodule)

> **Note** (Development)
>
> You can get the `melon-types` typing source for this submodule [here](../../melon-types/dotnet.d.ts#L12) and the submodule core source [here](../../melon-runtime/Melon.Library/Dotnet/dotnet.js#L30).

### sbyte (Method)

Represents a dotnet `sbyte` (SByte) data type. Can be used to create Realm instances with the correct data types.

**⚡ Usage (JavaScript/TypeScript):**

```js
const { sbyte } = dotnet.types;
const mySbyte = sbyte(127);
```

### byte (Method)

Represents a dotnet `byte` (Byte) data type. Can be used to create Realm instances with the correct data types.

**⚡ Usage (JavaScript/TypeScript):**

```js
const { byte } = dotnet.types;
const myByte = byte(255);
```

### short (Method)

Represents a dotnet `short` (Int16) data type. Can be used to create Realm instances with the correct data types.

**⚡ Usage (JavaScript/TypeScript):**

```js
const { short } = dotnet.types;
const myShort = short(32767);
```

### ushort (Method)

Represents a dotnet `ushort` (UInt16) data type. Can be used to create Realm instances with the correct data types.

**⚡ Usage (JavaScript/TypeScript):**

```js
const { ushort } = dotnet.types;
const myUshort = ushort(32767);
```

### int (Method)

Represents a dotnet `int` (Int32) data type. Can be used to create Realm instances with the correct data types.

**⚡ Usage (JavaScript/TypeScript):**

```js
const { int } = dotnet.types;
const myInt = int(2147483647);
```

### uint (Method)

Represents a dotnet `uint` (UInt32) data type. Can be used to create Realm instances with the correct data types.

**⚡ Usage (JavaScript/TypeScript):**

```js
const { uint } = dotnet.types;
const myUint = uint(4294967295);
```

### long (Method)

Represents a dotnet `long` (Int64) data type. Can be used to create Realm instances with the correct data types.

**⚡ Usage (JavaScript/TypeScript):**

```js
const { long } = dotnet.types;
const myLong = long(4294967295);
```

### ulong (Method)

Represents a dotnet `ulong` (UInt64) data type. Can be used to create Realm instances with the correct data types.

**⚡ Usage (JavaScript/TypeScript):**

```js
const { ulong } = dotnet.types;
const myUlong = ulong(4294967295);
```

### float (Method)

Represents a dotnet `float` data type. Can be used to create Realm instances with the correct data types.

**⚡ Usage (JavaScript/TypeScript):**

```js
const { float } = dotnet.types;
const myFloat = float(10.5);
```

### double (Method)

Represents a dotnet `double` data type. Can be used to create Realm instances with the correct data types.

**⚡ Usage (JavaScript/TypeScript):**

```js
const { double } = dotnet.types;
const myDouble = double(10.5);
```

### decimal (Method)

Represents a dotnet `double` data type. Can be used to create Realm instances with the correct data types.

**⚡ Usage (JavaScript/TypeScript):**

```js
const { decimal } = dotnet.types;
const myDecimal = decimal(10.5);
```

## Realm (Constructor)

Realm is a special constructor that allows the JavaScript code do manipulate, execute and get a return value of C# instances via proxy, using helper methods. Each realm needs an identifier because the "Realms" are stored statically inside the program execution and NOT inside the `Engine` instance.

### name (Property)

The name (`string`) - identifier - of the Realm, this property makes a "link" to find the internal realm reference, where the instances to be manipulated will be stored.

> **Note** (Development)
>
> You can get the `melon-types` typing source for this property [here](../../melon-types/types/dotnet/Realm.ts#L4) and the submodule core source [here](../../melon-runtime/Melon.Library/Dotnet/dotnet.js#L149).

[Back to top](./dotnet.md)