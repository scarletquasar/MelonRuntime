<div align="center">
  <img align="center" width="225" src="https://i.imgur.com/guuToyf.png">
</div>

<br>

<div align="center">

  [![npm version](https://badgen.net/npm/v/melon-runtime/)](https://www.npmjs.com/package/melon-runtime)
  [![npm downloads](https://badgen.net/npm/dm/melon-runtime)](https://www.npmjs.com/package/melon-runtime)
  
</div>

<hr>

Welcome to **Melon** interactive documentation. In this summary you will find references to the standard libraries, tutorials, and resources to make learning and using the runtime easier.

<hr>

## 🔥 Getting Started

Welcome to Melon! Melon is a .NET declarative JavaScript runtime that focuses on fast and reliable software development, always in a robust and scalable way. To get started, you will need to install [ASP.NET 6](https://dotnet.microsoft.com/en-us/download/dotnet/6.0) and [Node.js](https://nodejs.org/en/).

> **Note**
> 
> `ASP.NET 6` is needed by Melon as core framework and `Node.js` is needed because it comes with `npm`, 
> that is needed to install, make and execute projects. These requirements are needed to execute the runtime
> in an easy way. You can also execute Melon runtime by compiling the source code.

## Installation

After having the basic requirements (in some cases, depending on your operational system, version and provider you may need to restart your device before starting), open your desired terminal and execute the following command:

```bash
> npm install melon-runtime -g -f
```

> **Note**
> 
> The installation command is basic: you will be calling `npm`, setting the name of desired package as `melon-runtime` and passing 
> the global (it means that you can use the package anywhere) `-g` flag and the force (it will overwrite any older version of 
> `melon-runtime` and prevent caching issues) `-f` flag.


## Creating a project

Melon, by default, have two ways to create a new project: just navigate to the desired folder (our root), certify you have administrator rights (it may not be needed in the most of cases), open your desired terminal and execute the following command:

```bash
> npx melon new [javascript|typescript]
```

> **Waring**
> 
> You may specify only one of the two options: `javascript` or `typescript`, a template project will be created fastly
> after running the command with the specified target development environment.