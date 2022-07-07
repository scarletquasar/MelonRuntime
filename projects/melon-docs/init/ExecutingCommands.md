# 🔩 Executing commands

MelonRuntime's core is called from a console application, so a command must be executed
to promote its straightforward functionality, such as running scripts and loading projects.

Currently, MelonRuntime can be executed using:

```bash
npx melon [command] [...arguments?]
```

## Commands

- `npx melon` - Run in local console mode
- `npx melon info` - Shows information about MelonRuntime
- `npx melon [clear|cls]` - Clear the console screen
- `npx melon load [path]` - Load a project with a valid melon.json
- `npx melon exec [path]` - Run a standalone JavaScript file
- `npx melon run [string]` - Run a standalone JavaScript string
- `npx melon new [path]` - Create a new TypeScript Melon project

## Flags