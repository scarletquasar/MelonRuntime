<div align="center">
  <img align="center" width="225" src="https://i.imgur.com/guuToyf.png">
</div>

<br>

<div id="no-view" align="center">

  [![npm version](https://badgen.net/npm/v/melon-runtime/)](https://www.npmjs.com/package/melon-runtime)
  [![npm downloads](https://badgen.net/npm/dm/melon-runtime)](https://www.npmjs.com/package/melon-runtime)

  [Getting Started](../Index.md) - [Melon Commands](../MelonCommands.md) - [dotnet](./dotnet.md) - std - [console](./consle.md) - [fs](./fs.md) - [guards](./guards.md) - [http](./http.md) - [data](./data.md) - [Async Constructors](./AsyncConstructors.md) - [Generic Constructors](./GenericConstructors.md)
  
</div>

<hr>

`std` module reference for Melon.

<hr>

### Summary

- [shift (Method)](#shift-method)
- [melon (Submodule)](#melon-submodule)
  - [currentVersion (Property)](#currentversion-property)
  - [loadedModules (Property)](#loadedmodules-property)
- [boolean (Submodule)](#boolean-submodule)
  - [checkAll (Method)](#checkall-method)
  - [checkOne (Method)](#checkone-method)
- [json (Submodule)](#json-submodule)
  - [tryParse (Method)](#tryparse-method)
  - [tryStringify (Method)](#trystringify-method)
<hr>

## shift (Method)

Creates a callback chain that will execute a callback based in a condition that is related to the initial specified value.

**⚡ Usage (JavaScript):**

```js
shift(value).option(condition, function);
```

```js
const { shift } = dotnet;

shift()
  .option(1, () => console.log("Hello "))
  .option(1 || 2, , () => console.log("World!"))
```

**⚡ Usage (TypeScript):**

```ts
shift<T>(value).option(condition, function);
```

```ts
const { shift } = dotnet;

shift<number>()
  .option(1, () => console.log("Hello "))
  .option(1 || 2, , () => console.log("World!"))
```

## melon (Submodule)

`melon` submodule contains utilities related to the runtime environment and useful information.

### currentVersion (Property)

[Version](./GenericConstructors.md#version-constructor) instance of the current Melon version.

### loadedModules (Property)

Returns a `string[]` containing the name of the loaded modules in this Melon execution.

## boolean (Submodule)

Contains utilities to manipulate and generate boolean values.

### checkAll (Method)

Check all the conditions using a lambda expression, if they're true, returns true, otherwise, returns false.

**⚡ Usage (JavaScript/TypeScript):**

```ts
console.log(std.boolean.checkAll(x => x === true, [true, true, false])); //false
```

### checkOne (Method)

Check one condition using a lambda expression, if it's true, returns true, otherwise, returns false.

**⚡ Usage (JavaScript/TypeScript):**

```ts
console.log(std.boolean.checkOne(x => x === true, [true, true, false])); //true
```

## json (Submodule)

Contains utilities to serialize, deserialize, manipulate and generate JSON values.

### tryParse (Method)

Tries to parse a JSON string, if it fails, executes a callback and returns a custom value.

**⚡ Usage (JavaScript):**

```ts
tryParse(string, options);
```

```js
const myObject = std.json.tryParse("{a:1}", {
  onErrorReturn: {},
  modifier: x => x
});
```

**⚡ Usage (TypeScript):**

```ts
tryParse<TOutput>(string, options);
```

```ts
const myObject = std.json.tryParse<Record<string, number>>("{a:1}", {
  onErrorReturn: {},
  modifier: x => x
});
```

### tryStringify (Method)

Tries to stringify a variable, if it fails, executes a callback and returns a custom value.

**⚡ Usage (JavaScript/TypeScript):**

```js
tryStringify(object, options);
```

```js
const myString = std.json.tryStringify({a:1}, {
  onErrorReturn: "",
  modifier: x => x
});
```

## time (Submodule)

Contains utilities related to time and timers in general.

### setInterval (Method)

Repeatedly calls a function or executes a code snippet, with a fixed time delay (milisseconds) between each call.

**⚡ Usage (JavaScript/TypeScript):**

```js
setInterval(function, delay);
```

```js
const { setInterval } = std.time;

setInterval(() => console.log("Hello world!"), 2000)
```

### setTimeout (Method)

Sets a timer (milisseconds) which executes a function or specified piece of code once the timer expires.

**⚡ Usage (JavaScript/TypeScript):**

```js
setTimeout(function, delay);
```

```js
const { setTimeout } = std.time;

setTimeout(() => console.log("Hello world!"), 2000)
```

## system (Submodule)

### osInformation (Submodule)

#### platform (Property)

The current platform id.

**⚡ Platforms (TypeScript):**

```ts
Win32S = 0
Win32Windows = 1
Win32NT = 2
WinCE = 3
Unix = 4
Xbox = 5
MacOSX = 6
Other = 7
```

**⚡ Usage (JavaScript):**

```ts
std.system.osInformation.platform; //number
```

**⚡ Usage (TypeScript):**

```ts
std.system.osInformation.platform; //Platform
```

#### version

The version string of the current operating system.

**⚡ Usage (JavaScript/TypeScript):**

```ts
std.system.osInformation.version; //string
```

#### servicePack

The service pack (only Windows) string of the current operating system.

**⚡ Usage (JavaScript/TypeScript):**

```ts
std.system.osInformation.servicePack; //string
```

## environment (Submodule)

### baseDirectory (Property)

The base application directory path.

**⚡ Usage (JavaScript/TypeScript):**

```ts
std.environment.baseDirectory; //string
```

### getEnvironmentVariables (Method)

Returns the current environment variables.

**⚡ Usage (JavaScript/TypeScript):**

```ts
std.environment.getEnvironmentVariables(); //Record<string, any>
```

### setEnvironmentVariable (Method)

Set a custom environment variable.

**⚡ Usage (JavaScript/TypeScript):**

```ts
std.environment.setEnvironmentVariable("name", value);
```

### clearLocalEnvironmentVariables (Method)

Clear all **custom** environment variables.

**⚡ Usage (JavaScript/TypeScript):**

```ts
std.environment.clearLocalEnvironmentVariables();
```

## process (Submodule)

### argv (Property)

The current command line arguments.

**⚡ Usage (JavaScript/TypeScript):**

```ts
std.process.argv; //string[]
```

### env (Property)

The current environment variables.

**⚡ Usage (JavaScript/TypeScript):**

```ts
std.process.argv; //Record<string, any>
```

### exit (Method)

Finish the current Melon instance (process).

**⚡ Usage (JavaScript/TypeScript):**

```ts
std.process.exit();
```