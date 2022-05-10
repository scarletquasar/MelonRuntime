# 🍈 MelonJS
MelonJS is a .NET based dynamic JavaScript runtime made in C# and based in [Jint](https://github.com/sebastienros/jint) and [CLI.NET](https://github.com/EternalQuasar0206/Cli.NET). Currently in development.

- Check the [documentation](https://github.com/MelonRuntime/MelonJS.Docs).

## Todo List

⛔ To Do
✅ Done

| Name | Description | Status | Related PR's/Repos |
| ---- | ----------- | ------ | ------- |
| Project structure reader with `app.json` | | ⛔ | |
| Add `function` converter to string (to internal operations) | | ⛔ | |
| TypeScript JIT runtime transpiling | | ⛔ | |
| Implement `shift` switch case [alternative](https://gist.github.com/EternalQuasar0206/9245eb9b6dd5e123e4c04604ccd4f630) | | ⛔ | |
| Implement `performance` module | | ⛔ | |
| Implement `BroadcastChannel` | | ⛔ | |
| Map and implement useful polyfill bindings | | ⛔ | |
| Implement diverse bindings | `async`, `cron`, `generator`, `child`, `task` | ⛔ | |
| Query support to `HttpApplication` routes | | ⛔ | |
| Basic documentation | | ✅ | [MelonJs.Docs](https://github.com/MelonRuntime/MelonJS.Docs) |
| `HttpApplication` constructor | Constructor to make a new web application hosted in the local server with the method `get` and `http.app` | ✅ | [PR6](https://github.com/EternalQuasar0206/MelonJS/pull/6) |
| `http` built in module | Http built in module that aggregates functions like `request` and `ping` | ✅ | [PR1](https://github.com/EternalQuasar0206/MelonJS/pull/1), [PR2](https://github.com/EternalQuasar0206/MelonJS/pull/2), [PR3](https://github.com/EternalQuasar0206/MelonJS/pull/3) |
| Stack traces | Implement stack tracing information into internal error handling | ✅ | [PR5](https://github.com/EternalQuasar0206/MelonJS/pull/5) |
| Internal error handling | The capacity to deal internally with runtime (JavaScript/TypeScript) errors and provide an output | ✅ | [PR4](https://github.com/EternalQuasar0206/MelonJS/pull/4) |
