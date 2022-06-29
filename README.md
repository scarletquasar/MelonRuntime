<div align="center">
  <img align="center" width="225" src="https://i.imgur.com/guuToyf.png">
</div>

<br>

<div align="center">

  [![npm version](https://badgen.net/npm/v/melon-runtime/)](https://www.npmjs.com/package/melon-runtime)
  [![npm downloads](https://badgen.net/npm/dm/melon-runtime)](https://www.npmjs.com/package/melon-runtime)
  
</div>

<hr>

**MelonRuntime** is a dynamic, easy-to-use JavaScript runtime focused in **automation**, **data management** and dedicated **web applications**.

<hr>

- [Documentation (in development)](https://zippy-sunflower-e51862.netlify.app/)
- [Changelog](https://github.com/MelonRuntime/MelonRuntime/blob/main/CHANGELOG.md)

## Why Melon?

**MelonRuntime** is built using the power, practicality and performance of the [.NET environment](https://dotnet.microsoft.com/en-us/), so it has extended capabilities to **JavaScript** and **TypeScript** in addition to the following advantages:

- Easy to use, **zero configuration** required to build and execute projects
- **TypeScript** by default: MelonRuntime generated projects use static typing security and reliability
- Based in NPM, so can leverage NPM package manager for quick library and tool management
- Wide range of built-in libraries bringing ease to the development of scalable and maintainable applications

## Installation and usage:
> Tip: How to install ASP.NET 6 Runtime ([Windows](https://www.youtube.com/watch?v=AC5UWby16sg) | [Linux](https://www.youtube.com/watch?v=g0vuTh0Dao8))

- Install [ASP.NET 6.0 runtime](https://dotnet.microsoft.com/en-us/download/dotnet/6.0) if you haven't already
- Install the `melon-runtime` package globally using the command: `npm i melon-runtime@1.6.0 -g -f` or select a version from the table below:

| Version | Type |
| ------- | ---- |
| [1.7.0-next.1](https://www.npmjs.com/package/melon-runtime/v/1.7.0-next.1) | Last development |
| [1.6.0](https://www.npmjs.com/package/melon-runtime/v/1.6.0) | **Last Stable** |

## Generating and executing a project

- Go to a directory using `terminal` or inside your IDE and execute the command: `npx melon new`, a basic node.js-based file structure will be created
- Run `npm install` to install the required [melon types](https://www.npmjs.com/package/melon-types) and start working with **TypeScript**
- Run `npm run go` to initialize the project

> Tip: A bundle file containing all installed NPM packages and your project will be created in `/dist/main.js`

## Docker

- [Dockerfile models](https://github.com/MelonRuntime/MelonRuntime/tree/main/utils/dockerfiles/)
- [MelonRuntime docker integration example](https://github.com/EternalQuasar0206/docker-api-melon)

## Extra

- [Check the MelonRuntime-compatible verified useful NPM packages](https://github.com/MelonRuntime/MelonRuntime/blob/main/compatible-libraries.md)
