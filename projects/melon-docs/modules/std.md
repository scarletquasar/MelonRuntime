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

<hr>

## shift (Method)

Creates a callback chain that will execute a callback based in a condition that is related to the initial specified value.

**⚡ Usage (JavaScript/TypeScript):**

```ts
const { shift } = dotnet;

shift()
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