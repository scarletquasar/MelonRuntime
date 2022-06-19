<div align="center">
  <img align="center" width="225" src="https://i.imgur.com/guuToyf.png">
</div>
<hr>

**MelonRuntime** is a dynamic, easy-to-use JavaScript runtime focused in **automation**, **data management** and dedicated **web applications**.

<hr>

## Why Melon?

**MelonRuntime** is built using the power, practicality and performance of the [.NET environment](https://dotnet.microsoft.com/en-us/), so it has extended capabilities to **JavaScript** and **TypeScript** in addition to the following advantages:

- Easy to use, **zero configuration** required to build and execute projects
- Based in NPM, so can leverage NPM package manager for quick library and tool management
- Wide range of built-in libraries bringing ease to the development of scalable and maintainable applications

## Installation and usage:
> Tip: How to install .NET 6 Runtime and SDK ([Windows](https://www.youtube.com/watch?v=AC5UWby16sg) | [Linux](https://www.youtube.com/watch?v=g0vuTh0Dao8))

- Install [.NET 6.0 runtime and sdk](https://dotnet.microsoft.com/en-us/download/dotnet/6.0) if you haven't already
- Install the `melon-runtime` package globally using the command: `npm i melon-runtime@[version] -g -f`. Check the version table below to know the current melon stable and development versions

| Version | Type |
| ------- | ---- |
| [1.3.0](https://www.npmjs.com/package/melon-runtime/v/1.3.0) | Stable |
| [1.4.0-rc1](https://www.npmjs.com/package/melon-runtime/v/1.4.0-rc1) | Development |

## Generating and executing a project

- Go to a directory using `terminal` or inside your IDE and execute the command: `npx melon new`, a basic node.js-based file structure will be created
- Run `npm install` to install the required [melon types](https://www.npmjs.com/package/melon-types) and start working with **TypeScript**
- Run `npm run go` to initialize the project

> Tip: A bundle file containing all installed NPM packages and your project will be created in `/dist/main.js`
