<div align="center">
  <img align="center" width="225" src="https://i.imgur.com/guuToyf.png">
</div>

<hr>

✨ Creating and executing a new Melon project

<hr>

- Create and go to your project folder, you can use `mkdir` and `cd` or do it manually
- Use the command `npx melon new` and a default project will be created
- To execute, use the command `npm run go`

## 📌 What will happen?

A new set of pre-built files will be created in that folder, allowing you to develop
a new complete application from this base. For default, all Melon pre-built applications
are **TypeScript-based**.

```mermaid
graph TD;
    Root-->/src/;
    /src/-->index.ts;
    Root-->.babelrc;
    Root-->.gitignore;
    Root-->package.json;
    Root-->tsconfig.json;
```
