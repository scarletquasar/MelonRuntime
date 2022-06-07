# 🍈 MelonJS
MelonJS is a dynamic, easy-to-use JavaScript runtime focused in experiments and data handling. Currently in development.

## Installation and usage:

Requires [.NET 6.0 runtime and sdk](https://dotnet.microsoft.com/en-us/download/dotnet/6.0).

- Via NPM (any platform):

Latest Install:
```bash
npm i melon-runtime@latest -g -f
```

Stable Install:
```bash
npm i melon-runtime@1.0.1-fixed3 -g
```

Command:
```bash
npx melon [...commands]
```

- Inside the cloned repository (currently only windows):

```cpp
//Windows

.\com run [...commands]
```

```cpp
//Windows

.\com install [path]
melon [...commands]
```

## More

- Check the [documentation](https://github.com/MelonRuntime/MelonJS.Docs)
- Check our temporary [TODO list](https://github.com/MelonRuntime/MelonJS/blob/main/TODO.md)

## Changes to be logged in the next version

Current version (npm): `1.0.1-fixed3`

- Now `load` function can load standalone functions (currently as strings) and expression functions and will parse other values correctly.
- Implemented built-in `PgClient` to connect to Postgres databases using raw sql directly
